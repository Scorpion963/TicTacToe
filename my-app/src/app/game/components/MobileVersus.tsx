import MobileVersusPlayerSection from "./MobileVersusPlayerSection";
import VersusLine from "./VersusLine";

export default function MobileVersus() {
    return (
      <div className="flex-col flex gap-2">
        <MobileVersusPlayerSection />
        <VersusLine />
        <MobileVersusPlayerSection />
      </div>
    );
  }