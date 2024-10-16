import React from "react";
import ClientNavigationBar from "../shared/ClientNavigationBar";
import ClientFooter from "../shared/ClientFooter";
import ClientRegisterForm from "../../components/ClientRegisterForm";
import SpecialRequest from "../../components/Client/SpecialRequestClient";

const ClientRequest = () => {
  return (
    <div>
      <div>
        <ClientNavigationBar selected={'request'}/>
      </div>

      <div className="my-8 bg-white">
        <SpecialRequest />
      </div>

      <div>
        <ClientFooter />
      </div>
    </div>
  );
};

export default ClientRequest;
