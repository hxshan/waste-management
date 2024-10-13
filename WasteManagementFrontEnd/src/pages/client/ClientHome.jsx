import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Recycle, TrendingUp, Clock, Award, Users } from "lucide-react";

const ClientHome = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Smart Waste Management for a Cleaner Future
            </h1>
            <p className="text-xl mb-8">
              Optimize your waste collection and disposal with our cutting-edge
              system
            </p>
            <div className="space-x-8">
              <Link
                to="/login"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              >
                Login
              </Link>

              <Link
                to="/client-register"
                className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Trash2 size={40} />,
                title: "Smart Collection",
                description:
                  "Optimize routes and schedules for efficient waste collection",
              },
              {
                icon: <Recycle size={40} />,
                title: "Recycling Management",
                description:
                  "Track and manage recycling efforts to maximize sustainability",
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Real-time Analytics",
                description:
                  "Monitor waste trends and make data-driven decisions",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-blue-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Benefits for Your Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock size={32} />,
                title: "Time Savings",
                description: "Reduce collection times and improve efficiency",
              },
              {
                icon: <Award size={32} />,
                title: "Environmental Impact",
                description: "Minimize waste and increase recycling rates",
              },
              {
                icon: <TrendingUp size={32} />,
                title: "Cost Reduction",
                description: "Optimize resources and reduce operational costs",
              },
              {
                icon: <Users size={32} />,
                title: "Citizen Satisfaction",
                description: "Improve waste management services for residents",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="text-blue-600 mr-4 mt-1">{benefit.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Revolutionize Your Waste Management?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of communities benefiting from our smart system
          </p>
          <Link
            to="/demo"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Request a Demo
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 italic mb-4">
              "Implementing the Smart Waste Management System has transformed
              our city's approach to waste collection. We've seen a 30%
              reduction in operational costs and a significant increase in
              recycling rates. It's been a game-changer for our community."
            </p>
            <div className="flex items-center">
              <img
                src="/api/placeholder/64/64"
                alt="Client"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">Jane Smith</p>
                <p className="text-gray-500">City Environmental Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClientHome;
