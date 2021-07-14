import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import MainStep from "./components/Steps/Main";
import SettingStep from "./components/Steps/Setting";
import { StepType } from "./types";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

function App(): JSX.Element {
  const classes = useStyles();
  const [step, setStep] = useState<StepType>("APP");

  const handleStepName = (text: StepType) => setStep(text);

  return (
    <Card className={classes.root}>
      {step === "APP" ? (
        <MainStep handleStepName={handleStepName} />
      ) : (
        <SettingStep handleStepName={handleStepName} />
      )}
    </Card>
  );
}

export default App;
