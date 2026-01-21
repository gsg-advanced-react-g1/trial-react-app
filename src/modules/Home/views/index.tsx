import { useFeatureFlag } from "../../FeatureFlags";
import SpecialOffersContainer from "../components/SpecialOffersContainer";

const Home = () => {

  const isSpecialOffersEnabled = useFeatureFlag("isSpecialOffersEnabled");

  return <>
    <h2 className="text-2xl">Welcome Home</h2>
    {
      isSpecialOffersEnabled &&
      <SpecialOffersContainer title="Special Offers" subtitle="Check out our special offers">
        <p>No special offers available at the moment</p>
      </SpecialOffersContainer>
    }
  </>;
};

export default Home
