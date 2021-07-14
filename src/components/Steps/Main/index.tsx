import {
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import React, { ChangeEvent, useEffect, useState } from "react";
import { StepType, WeatherType } from "../../../types";
import NearMeIcon from "@material-ui/icons/NearMe";
import SettingsIcon from "@material-ui/icons/Settings";
import ExploreIcon from "@material-ui/icons/Explore";
import { useStepStyles } from "../style";
import { getPosition } from "../../../utils/helpers";
import {
  getWeatherByLocation,
  getWeatherByName,
} from "../../../utils/data-managment";
import StepsInput from "../StepsInput";

type MainStepProps = {
  handleStepName: (text: StepType) => void;
};

export default function index({ handleStepName }: MainStepProps): JSX.Element {
  const [weatherInfo, setWeatherInfo] = useState<Partial<WeatherType>>({});
  const [serach, setSearch] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStepStyles();

  useEffect(() => {
    getPosition()
      .then((position) => getWeatherByLocation(position))
      .then((data) => setWeatherInfo(data))
      .catch((err) => setErrorText(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    if (errorText) setErrorText("");
    const { value } = e.target;
    setSearch(value);
  };

  const searchCountry = () => {
    setLoading(true);
    getWeatherByName(serach)
      .then((data) => {
        setWeatherInfo(data);
        setSearch("");
      })
      .catch((err) => setErrorText(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <CardHeader
        action={
          <IconButton
            aria-label="settings"
            onClick={() => handleStepName("SETTINGS")}
          >
            <SettingsIcon />
          </IconButton>
        }
        title={weatherInfo?.name}
      />

      <CardContent>
        <div className={classes.mainInfoBlock}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <img
                src={`http://openweathermap.org/img/wn/${
                  weatherInfo?.weather && weatherInfo?.weather[0]?.icon
                }@2x.png`}
                alt="weather image"
              />
              <Typography variant="h4" component="p">
                {weatherInfo?.main?.temp}
                <span>&#8451;</span>
              </Typography>
            </>
          )}
        </div>
        <Typography component="p">
          {weatherInfo?.weather && weatherInfo?.weather[0]?.description}
        </Typography>
        <div className={classes.secondaryInfoBlock}>
          <Typography
            className={classes.secondaryInfo}
            color="textSecondary"
            component="p"
          >
            <NearMeIcon /> {weatherInfo?.wind?.speed}m/s SSE
          </Typography>
          <Typography
            className={classes.secondaryInfo}
            color="textSecondary"
            component="p"
          >
            <ExploreIcon /> {weatherInfo?.main?.pressure}Pa
          </Typography>
          <Typography
            className={classes.secondaryInfo}
            color="textSecondary"
            component="p"
          >
            Humidity: {weatherInfo?.main?.humidity}%
          </Typography>

          <Typography
            className={classes.secondaryInfo}
            color="textSecondary"
            component="p"
          >
            Visibility: {weatherInfo?.visibility} m
          </Typography>
        </div>

        <StepsInput
          onChange={handleSearchText}
          value={serach}
          label="Search"
          onClick={searchCountry}
        />

        {errorText && (
          <Typography className={classes.error} component="p" color="error">
            {errorText}
          </Typography>
        )}
      </CardContent>
    </>
  );
}
