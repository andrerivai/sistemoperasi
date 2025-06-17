// Tugas page specific JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {
  // Algorithm data for disk scheduling
  const algorithmData = {
    fcfs: {
      name: "FCFS (First Come First Served)",
      movement: 20420,
      path: [
        1234, 1500, 1100, 1750, 1900, 310, 850, 60, 1300, 1400, 600, 900, 1500,
        1000, 30, 1900, 2002, 700, 1300, 55, 2025, 195, 700, 1500, 200,
      ],
      color: "#ef4444",
    },
    sstf: {
      name: "SSTF (Shortest Seek Time First)",
      movement: 2786,
      path: [
        1234, 1300, 1300, 1400, 1500, 1500, 1500, 1750, 1900, 1900, 2002, 2025,
        1100, 1000, 900, 850, 700, 700, 600, 310, 200, 195, 60, 55, 30,
      ],
      color: "#10b981",
    },
    scan: {
      name: "SCAN (Elevator Algorithm)",
      movement: 2834,
      path: [
        1234, 1300, 1300, 1400, 1500, 1500, 1500, 1750, 1900, 1900, 2002, 2025,
        2049, 1100, 1000, 900, 850, 700, 700, 600, 310, 200, 195, 60, 55, 30,
      ],
      color: "#3b82f6",
    },
    cscan: {
      name: "C-SCAN (Circular SCAN)",
      movement: 3964,
      path: [
        1234, 1300, 1300, 1400, 1500, 1500, 1500, 1750, 1900, 1900, 2002, 2025,
        2049, 0, 30, 55, 60, 195, 200, 310, 600, 700, 700, 850, 900, 1000, 1100,
      ],
      color: "#f59e0b",
    },
    look: {
      name: "LOOK",
      movement: 2786,
      path: [
        1234, 1300, 1300, 1400, 1500, 1500, 1500, 1750, 1900, 1900, 2002, 2025,
        1100, 1000, 900, 850, 700, 700, 600, 310, 200, 195, 60, 55, 30,
      ],
      color: "#10b981",
    },
    clook: {
      name: "C-LOOK (Circular LOOK)",
      movement: 3856,
      path: [
        1234, 1300, 1300, 1400, 1500, 1500, 1500, 1750, 1900, 1900, 2002, 2025,
        30, 30, 55, 60, 195, 200, 310, 600, 700, 700, 850, 900, 1000, 1100,
      ],
      color: "#f59e0b",
    },
    lifo: {
      name: "LIFO (Last In First Out)",
      movement: 21188,
      path: [
        1234, 200, 1500, 700, 195, 2025, 55, 1300, 700, 2002, 1900, 30, 1000,
        1500, 900, 600, 1400, 1300, 60, 850, 310, 1900, 1750, 1100, 1500,
      ],
      color: "#ef4444",
    },
  };

  // Initialize charts
  initializeAlgorithmChart();
  initializePathChart();

  // Algorithm selector functionality
  const algorithmButtons = document.querySelectorAll(".algo-btn");
  algorithmButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      algorithmButtons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Update path chart
      const algorithm = this.dataset.algo;
      updatePathChart(algorithm);
    });
  });

  // Initialize algorithm comparison chart
  function initializeAlgorithmChart() {
    const ctx = document.getElementById("algorithmChart");
    if (!ctx) return;

    const algorithms = Object.keys(algorithmData);
    const movements = algorithms.map((algo) => algorithmData[algo].movement);
    const colors = algorithms.map((algo) => algorithmData[algo].color);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: algorithms.map(
          (algo) => algorithmData[algo].name.split(" ")[0]
        ),
        datasets: [
          {
            label: "Total Head Movement",
            data: movements,
            backgroundColor: colors.map((color) => color + "40"),
            borderColor: colors,
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Perbandingan Total Head Movement Algoritma Disk Scheduling",
            font: {
              size: 16,
              weight: "bold",
            },
            padding: 20,
          },
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `Total Movement: ${context.parsed.y.toLocaleString()}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Total Head Movement",
            },
            ticks: {
              callback: function (value) {
                return value.toLocaleString();
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Algoritma",
            },
          },
        },
        animation: {
          duration: 1500,
          easing: "easeInOutQuart",
        },
      },
    });
  }

  // Initialize path visualization chart
  let pathChart;
  function initializePathChart() {
    const ctx = document.getElementById("pathChart");
    if (!ctx) return;

    pathChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            label: "Head Position",
            data: [],
            borderColor: "#10b981",
            backgroundColor: "#10b98120",
            borderWidth: 3,
            fill: true,
            tension: 0.1,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Visualisasi Path Algoritma SSTF",
            font: {
              size: 16,
              weight: "bold",
            },
            padding: 20,
          },
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              title: function (context) {
                return `Step ${context[0].dataIndex + 1}`;
              },
              label: function (context) {
                return `Track Position: ${context.parsed.y}`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 2100,
            title: {
              display: true,
              text: "Track Position",
            },
            grid: {
              color: "#e5e7eb",
            },
          },
          x: {
            title: {
              display: true,
              text: "Sequence Step",
            },
            grid: {
              color: "#e5e7eb",
            },
          },
        },
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
      },
    });

    // Initialize with SSTF algorithm
    updatePathChart("sstf");
  }

  // Update path chart with selected algorithm
  function updatePathChart(algorithmKey) {
    if (!pathChart || !algorithmData[algorithmKey]) return;

    const algorithm = algorithmData[algorithmKey];
    const steps = algorithm.path.map((_, index) => `Step ${index + 1}`);

    pathChart.data.labels = steps;
    pathChart.data.datasets[0].data = algorithm.path;
    pathChart.data.datasets[0].borderColor = algorithm.color;
    pathChart.data.datasets[0].backgroundColor = algorithm.color + "20";
    pathChart.data.datasets[0].pointBackgroundColor = algorithm.color;
    pathChart.options.plugins.title.text = `Visualisasi Path Algoritma ${algorithm.name}`;

    pathChart.update("active");

    // Update movement info
    updateMovementInfo(algorithm);
  }

  // Update movement information
  function updateMovementInfo(algorithm) {
    // Create or update movement info display
    let infoElement = document.querySelector(".movement-info");
    if (!infoElement) {
      infoElement = document.createElement("div");
      infoElement.className = "movement-info";
      infoElement.style.cssText = `
                margin-top: 1rem;
                padding: 1rem;
                background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
                border-radius: 0.75rem;
                border-left: 4px solid ${algorithm.color};
                font-weight: 500;
                color: #374151;
            `;
      document.querySelector(".path-chart-container").appendChild(infoElement);
    }

    infoElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>Total Head Movement: <strong style="color: ${
                  algorithm.color
                };">${algorithm.movement.toLocaleString()}</strong></span>
                <span>Total Steps: <strong>${
                  algorithm.path.length
                }</strong></span>
            </div>
        `;
    infoElement.style.borderLeftColor = algorithm.color;
  }

  // Add interactive features to result cards
  document.querySelectorAll(".result-card").forEach((card) => {
    card.addEventListener("click", function () {
      const algorithmName = this.querySelector("h5").textContent.toLowerCase();
      let algorithmKey = "";

      // Map algorithm names to keys
      switch (algorithmName) {
        case "fcfs":
          algorithmKey = "fcfs";
          break;
        case "sstf & look":
        case "sstf":
          algorithmKey = "sstf";
          break;
        case "scan":
          algorithmKey = "scan";
          break;
        case "c-scan":
          algorithmKey = "cscan";
          break;
        case "look":
          algorithmKey = "look";
          break;
        case "c-look":
          algorithmKey = "clook";
          break;
        case "lifo":
          algorithmKey = "lifo";
          break;
      }

      if (algorithmKey && algorithmData[algorithmKey]) {
        // Update active button
        document.querySelectorAll(".algo-btn").forEach((btn) => {
          btn.classList.remove("active");
          if (btn.dataset.algo === algorithmKey) {
            btn.classList.add("active");
          }
        });

        // Update chart
        updatePathChart(algorithmKey);

        // Scroll to chart
        document.querySelector(".path-chart-container").scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });

    // Add hover effect with algorithm preview
    card.addEventListener("mouseenter", function () {
      this.style.cursor = "pointer";
      this.style.transform = "translateY(-8px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Add animation to track sequence items
  document.querySelectorAll(".track-item").forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add("animate-fadeInUp");
  });

  // Add copy functionality to data values
  document.querySelectorAll(".data-value, .result-value").forEach((element) => {
    element.addEventListener("click", function () {
      navigator.clipboard.writeText(this.textContent).then(() => {
        // Show copy feedback
        const originalText = this.textContent;
        this.textContent = "Copied!";
        this.style.color = "#10b981";

        setTimeout(() => {
          this.textContent = originalText;
          this.style.color = "";
        }, 1000);
      });
    });

    element.style.cursor = "pointer";
    element.title = "Click to copy";
  });

  // Add keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          selectAlgorithm("fcfs");
          break;
        case "2":
          selectAlgorithm("sstf");
          break;
        case "3":
          selectAlgorithm("scan");
          break;
        case "4":
          selectAlgorithm("cscan");
          break;
        case "5":
          selectAlgorithm("look");
          break;
        case "6":
          selectAlgorithm("clook");
          break;
        case "7":
          selectAlgorithm("lifo");
          break;
      }
    }
  });

  function selectAlgorithm(algorithmKey) {
    const button = document.querySelector(`[data-algo="${algorithmKey}"]`);
    if (button) {
      button.click();
    }
  }

  // Add performance metrics
  function calculatePerformanceMetrics() {
    const movements = Object.values(algorithmData).map((algo) => algo.movement);
    const best = Math.min(...movements);
    const worst = Math.max(...movements);
    const average = movements.reduce((a, b) => a + b, 0) / movements.length;

    console.log("Performance Metrics:", {
      best: best,
      worst: worst,
      average: Math.round(average),
      improvement: `${Math.round(
        ((worst - best) / worst) * 100
      )}% improvement from worst to best`,
    });
  }

  calculatePerformanceMetrics();

  console.log("Tugas page functionality loaded! 📊");
});
