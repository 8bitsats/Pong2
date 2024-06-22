document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("pongCanvas");
  const ctx = canvas.getContext("2d");

  const user = {
      x: 0,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0
  };

  const computer = {
      x: canvas.width - 10,
      y: canvas.height / 2 - 50,
      width: 10,
      height: 100,
      color: "#FFF",
      score: 0
  };

  const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      speed: 5,
      velocityX: 5,
      velocityY: 5,
      color: "#FFF"
  };

  function drawRect(x, y, w, h, color) {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
  }

  function drawCircle(x, y, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
  }

  function drawText(text, x, y, color) {
      ctx.fillStyle = color;
      ctx.font = "45px Arial";
      ctx.fillText(text, x, y);
  }

  function render() {
      drawRect(0, 0, canvas.width, canvas.height, "#000"); // Clear canvas
      drawRect(user.x, user.y, user.width, user.height, user.color);
      drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
      drawCircle(ball.x, ball.y, ball.radius, ball.color);
      drawText(user.score, canvas.width / 4, canvas.height / 5, "#FFF");
      drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, "#FFF");
  }

  function game() {
      update();
      render();
  }

  const framePerSecond = 50;
  setInterval(game, 1000 / framePerSecond);

  function update() {
      // Ball movement
      ball.x += ball.velocityX;
      ball.y += ball.velocityY;

      // Collision detection
      if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
          ball.velocityY = -ball.velocityY;
      }

      let player = (ball.x < canvas.width / 2) ? user : computer;
      if (collision(ball, player)) {
          let collidePoint = ball.y - (player.y + player.height / 2);
          collidePoint = collidePoint / (player.height / 2);
          let angleRad = (Math.PI / 4) * collidePoint;
          let direction = (ball.x < canvas.width / 2) ? 1 : -1;
          ball.velocityX = direction * ball.speed * Math.cos(angleRad);
          ball.velocityY = ball.speed * Math.sin(angleRad);
          ball.speed += 0.5;
      }

      // Update scores and reset ball
      if (ball.x - ball.radius < 0) {
          computer.score++;
          resetBall();
      } else if (ball.x + ball.radius > canvas.width) {
          user.score++;
          resetBall();
      }

      // Move computer paddle
      computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.1;

      // Move user paddle
      document.addEventListener("mousemove", movePaddle);

      // Check score for popup
      checkScore();
  }

  function collision(b, p) {
      p.top = p.y;
      p.bottom = p.y + p.height;
      p.left = p.x;
      p.right = p.x + p.width;

      b.top = b.y - b.radius;
      b.bottom = b.y + b.radius;
      b.left = b.x - b.radius;
      b.right = b.x + b.radius;

      return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
  }

  function resetBall() {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.speed = 5;
      ball.velocityX = -ball.velocityX;
  }

  function movePaddle(event) {
      let rect = canvas.getBoundingClientRect();
      user.y = event.clientY - rect.top - user.height / 2;
  }

  // Redirect when score threshold is reached
  function checkScore() {
      if (user.score === 4) {
          displayPopup();
      }
  }

  function displayPopup() {
      const popup = document.getElementById("popup");
      popup.classList.remove("hidden");

      const mintButton = document.getElementById("mintButton");
      mintButton.onclick = () => {
          window.location.href = "https://truffle.wtf/project/recursedpong";
      };
  }

  // Image gallery setup
  const images = [
      "https://res.cloudinary.com/labradojo/image/upload/v1718412521/Recursed/IMG_2848_aqwzi4.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087891/IMG_3205_dcskx6.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087895/IMG_3219_nwsumv.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087898/IMG_3223_by1owb.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087895/IMG_3221_sywjv4.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087888/IMG_3152_ztqka9.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087884/IMG_3148_m5uhre.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087884/IMG_3137_vqgmlj.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087883/IMG_3136_cl9w9y.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087879/IMG_3111_qnhxpe.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087879/IMG_3110_l9fou5.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087876/IMG_3107_ww7trc.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087880/IMG_3114_oduuqe.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087880/IMG_3113_dofgsu.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087875/IMG_3094_yttfs9.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087875/IMG_3096_bgddzn.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1719087875/IMG_3069_ymszmx.png",
      "https://res.cloudinary.com/labradojo/image/upload/v1718412504/Recursed/IMG_2842_pvo9tz.png"
  ];

  const gallery = document.getElementById("image-gallery");
  images.forEach(src => {
      const anchor = document.createElement("a");
      anchor.href = src;
      anchor.target = "_blank";
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("hover:scale-110", "transition-transform", "duration-300");
      anchor.appendChild(img);
      gallery.appendChild(anchor);
  });
});
