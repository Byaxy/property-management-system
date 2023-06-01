export const barchartData = [
  {
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Income",
          data: [800, 600, 580, 400, 620, 610, 420],
          backgroundColor: ["#475BE8"],
          borderWidth: 1,
          borderRadius: 6,
          borderColor: "#475BE8",
        },
        {
          label: "Expenditure",
          data: [420, 300, 300, 200, 500, 500, 200],
          backgroundColor: ["#CFC8FF"],
          borderWidth: 1,
          borderRadius: 6,
          borderColor: "#CFC8FF",
        },
      ],
    },
  },
  {
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      maintainAspectRatio: true,
      responsive: true,
    },
  },
];
