//exmaple
import React from "react";

const SectionTestimonials = () => {
  return (
    <section className="section-testimonials">
      <div className="container">
        <div className="section-title">
          <h2>What Our Customers Say</h2>
        </div>
        <div className="section-content">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel viverra mi. Sed in accumsan purus. Nulla facilisi. Sed
                fermentum, turpis id ultricies tincidunt, purus mi lacinia
                lacus.
              </p>
            </div>
            <div className="testimonial-author">
              <img
                src="https://via.placeholder.com/150"
                alt="Testimonial Author"
              />
              <div className="author-info">
                <h4>John Doe</h4>
                <p>CEO, Tapmed</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="testimonial-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                vel viverra mi. Sed in accumsan purus. Nulla facilisi. Sed
                fermentum, turpis id ultricies tincidunt, purus mi lacinia
                lacus.
              </p>
            </div>
            <div className="testimonial-author">
              <img
                src="https://via.placeholder.com/150"
                alt="Testimonial Author"
              />
              <div className="author-info">
                <h4>Jane Doe</h4>
                <p>CTO, Tapmed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonials;
