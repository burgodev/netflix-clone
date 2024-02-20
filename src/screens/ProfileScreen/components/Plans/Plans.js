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
  const [products, setProducts] = useState([]);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const user = useSelector(selectUser);

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

  console.log("products", products);
  console.log("Object.entries(products)", Object.entries(products));

  return (
    <div>
      {Object.entries(products).map(([productId, productData]) => {
        return (
          <div key={productId} className="plansContainer">
            <div className="plansInfo">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() => loadCheckout(productData.prices.priceId)}
              disabled={isLoadingCheckout}
            >
              {isLoadingCheckout ? "Loading..." : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Plans;
