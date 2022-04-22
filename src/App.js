import react from "react";
import Footer from "./Components/UI/Footer";
import RestartButton from "./Components/UI/RestartButton";
import Spinner from "./Components/UI/Spinner";
import Counters from "./Components/Tasks/Counters";
import GetBirthday from "./Components/Tasks/GetBirthday";
import ErrorBoundary from "./Components/ErrorBoundary";
import useAppLogic from "./Components/Tasks/use-App-Logic";

function App() {
  // Using our custom hook component to import all the logic of the application and then pass it to other components via props.
  const {
    hideAndShow,
    restartApp,
    showForm,
    showSpinner,
    showElement,
    getBirhtdayDate,
    daysLeft,
    hoursLeft,
    minutesLeft,
    secondsLeft,
  } = useAppLogic();

  return (
    <react.Fragment>
      {showSpinner && <Spinner />}
      {showElement && (
        <Counters
          days={daysLeft}
          hours={hoursLeft}
          minutes={minutesLeft}
          seconds={secondsLeft}
        />
      )}
      {showForm && (
        <ErrorBoundary>
          <GetBirthday
            onGetBirthdayDate={getBirhtdayDate}
            onShowElements={hideAndShow}
          />
        </ErrorBoundary>
      )}
      {showElement && <RestartButton onRestartApp={restartApp} />}
      <Footer />
    </react.Fragment>
  );
}

export default App;
