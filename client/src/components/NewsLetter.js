import React from "react";

export function NewsLetter(props) {
  return (
    <section className="newsletter">
      <div className="newstext">
        <h3>Get updated frequently on latest property</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
          accusantium!
        </p>
      </div>
      <div className="form-wrap">
        <form>
          <div className="form-control">
            <input type="text" />
            <button>subscribe</button>
          </div>
        </form>
      </div>
    </section>
  );
}

NewsLetter.propTypes = {};
