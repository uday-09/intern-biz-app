import React from "react";
import { AirbnbRating } from "@rneui/themed";

const calculateAverageRating = (question, singleReview) => {
  let sum = 0;
  const qns = Object.keys(singleReview.review_response);
  qns.forEach((key) => {
    if (key !== "Comment") {
      sum = sum + singleReview.review_response[key];
    }
  });
  return sum / (qns.length - 1);
};

const AverageReview = ({ questions, singleReview }) => {
  const rating = calculateAverageRating(questions, singleReview);
  return (
    <>
      <AirbnbRating
        isDisabled={true}
        defaultRating={rating}
        size={16}
        ratingContainerStyle={{ alignItems: "flex-start" }}
        showRating={false}
        selectedColor={"orange"}
      ></AirbnbRating>
    </>
  );
};

export default AverageReview;
