import React, { useEffect, useState } from "react";
import "./Plans.css";
import "../../../../App.css";
import db from "../../../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../../../state/userSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePublishableKey =
  "pk_test_51OjnkYGcuMp15AOG7nnQM0zCoHm1SQB7axweBtlusdXu46Ad6m0qqvbGUqkKnZoXJlrJiJaNmsPFaGsJZeDteOXZ00azXe1os2";

const Plans = () => {
  const user = useSelector(selectUser);
  const [products, setProducts] = useState([]);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (subscription) => {
          setSubscription({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
            current_period_start:
              subscription.data().current_period_start.seconds,
          });
        });
      });
  }, [user.uid]);

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};

        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });

        setProducts(products);
      });
  }, []);

  const loadCheckout = async (priceId) => {
    setIsLoadingCheckout(true);
    const docRef = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }

      if (sessionId) {
        const stripe = await loadStripe(stripePublishableKey);

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div>
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(subscription?.current_period_end * 1000).toLocaleString()}
        </p>
      )}

      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "planScreenDisabled"
            } plansContainer`}
          >
            <div className="plansInfo">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
              disabled={isLoadingCheckout}
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
