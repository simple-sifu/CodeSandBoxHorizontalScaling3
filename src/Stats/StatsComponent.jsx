import React, { useState, useEffect } from "react";
import StatsPresenter from "./StatsPresenter";

export default function StatsComponent() {
  let statsPresenter = new StatsPresenter();
  const [stateViewModel, copyViewModelToStateViewModel] = useState("");

  useEffect(() => {
    statsPresenter.load((generatedViewModel) => {
      copyViewModelToStateViewModel(generatedViewModel);
    });
  }, []);

  return (
    <div>
      <h5>Last Added Book (ui)</h5>
      {stateViewModel.name}
      <h5>Total number of rows displayed</h5>
      {stateViewModel.totalRowsDisplayed}
    </div>
  );
}
