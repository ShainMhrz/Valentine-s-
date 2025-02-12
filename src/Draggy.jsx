import React, { useEffect } from "react";
import "./Draggy.css";

const Draggy = () => {
  useEffect(() => {
    let highestZ = 1;

    class Paper {
      holdingPaper = false;
      mouseTouchX = 0;
      mouseTouchY = 0;
      mouseX = 0;
      mouseY = 0;
      prevMouseX = 0;
      prevMouseY = 0;
      velX = 0;
      velY = 0;
      rotation = Math.random() * 30 - 15;
      currentPaperX = 0;
      currentPaperY = 0;
      rotating = false;

      init(paper) {
        document.addEventListener("mousemove", (e) => {
          if (!this.rotating) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.velX = this.mouseX - this.prevMouseX;
            this.velY = this.mouseY - this.prevMouseY;
          }

          const dirX = e.clientX - this.mouseTouchX;
          const dirY = e.clientY - this.mouseTouchY;
          const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
          const dirNormalizedX = dirX / dirLength;
          const dirNormalizedY = dirY / dirLength;

          const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
          let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;
          if (this.rotating) {
            this.rotation = degrees;
          }

          if (this.holdingPaper) {
            if (!this.rotating) {
              this.currentPaperX += this.velX;
              this.currentPaperY += this.velY;
            }
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
          }
        });

        paper.addEventListener("mousedown", (e) => {
          if (this.holdingPaper) return;
          this.holdingPaper = true;

          paper.style.zIndex = highestZ;
          highestZ += 1;

          if (e.button === 0) {
            this.mouseTouchX = this.mouseX;
            this.mouseTouchY = this.mouseY;
            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;
          }
          if (e.button === 2) {
            this.rotating = true;
          }
        });

        window.addEventListener("mouseup", () => {
          this.holdingPaper = false;
          this.rotating = false;
        });
      }
    }

    const papers = Array.from(document.querySelectorAll(".draggy .paper"));

    papers.forEach((paper) => {
      const p = new Paper();
      p.init(paper);
    });
  }, []);

  return (
    <div className="draggy">
      <div className="paper heart"></div>

      <div className="paper ">
        <p className="p1">
          So... let's go on a date tomorrow <br />
          before we head to the concert <br />
          with our friends✨
        </p>
      </div>
      <div className="paper">
        <p>
               your kindness melts my heart
          <br />
               and even when you’re mad <br />I can’t help but admire you.
        </p>
      </div>
      <div className="paper">
        <p>
          I don’t even know what to write now... <br />
               Maybe about how your <br />
          dumb side makes me laugh
          <br />
               your intelligent side <br />
          leaves me in awe
        </p>
      </div>

      <div className="paper image">
        <p className="p1">
          one isn't enough to capture <br /> how cute you are! <br />
          another picture of addorable you
        </p>
        <img src="src\assets\img\IMG_20250213_003149.jpg" alt="Cute" />
      </div>

      <div className="paper image">
        <p>Just look at my dumbo's adorable smile</p>
        <p>
          the one that makes me fall <br />
          for you every single time. ❤️
        </p>
        <img src="src/assets/img/IMG_20250209_105128.jpg" alt="Adorable" />
      </div>

      <div className="paper ">
        <p className="p1">
          i tried to stick to my descision... <br />
          but haha this dumb heart of mine <br />
          had its own plans✨
        </p>
      </div>
      <div className="paper ">
        <p className="p1">you know what</p>
        <p className="p2">
          i was so detrmined not to fall for anyone... <br /> but then I got to
          know you.
        </p>
        <p className="p3">And well falling for you was effortless.✨</p>
      </div>

      <div className="paper">
        <p className="p1">You are an amazing person</p>
        <p className="p1">I just wanted to say i ❤️ u.</p>
      </div>

      <div className="paper">
        <p className="p1">Drag the papers to move!</p>
      </div>
    </div>
  );
};

export default Draggy;
