import { useEffect, useState } from "react";
import ServiceCard from "../../../components/ServiceCard";

const Service = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <section className="py-5 px-3">
      <h1 className="text-3xl text-center font-bold font-mono my-5">
        Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services?.map((service) => {
          return (
            <ServiceCard
              key={service.id}
              img={service.image}
              title={service.title}
              desc={service.desc}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Service;
