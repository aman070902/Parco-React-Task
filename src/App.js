import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PieChart, Pie, Cell } from "recharts";

const App = () => {
  const defaultFunds = [
    { name: "C Fund", value: 50150 },
    { name: "G Fund", value: 64198 },
    { name: "I Fund", value: 15640 },
    { name: "Y Fund", value: 22739 },
    { name: "S Fund", value: 22493 },
    { name: "F Fund", value: 20371 },
  ];

  const lookThroughFunds = [
    { name: "C Fund", value: 50150 },
    { name: "G Fund", value: 85000 },
    { name: "I Fund", value: 54000 },
  ];

  const COLORS = ["#044F79", "#75787B", "#BAC8E5", "#344767", "#262627", "#21B8FD"];

  const [tabValue, setTabValue] = useState(0);
  const [currentFunds, setCurrentFunds] = useState(defaultFunds);
  const [centerLabel, setCenterLabel] = useState("$210,230");
  const [activeIndex, setActiveIndex] = useState(null);
  const [expandedFund, setExpandedFund] = useState(null);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);

    if (newValue === 0) {
      setCurrentFunds(defaultFunds);
      setCenterLabel("$210,230");
    } else if (newValue === 1) {
      setCurrentFunds(lookThroughFunds);
      setCenterLabel("$189,150");
    }
  };

  const handleMouseEnter = (data, index) => {
    setCenterLabel(`$${data.value.toLocaleString()}`);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (tabValue === 0) {
      setCenterLabel("$210,230");
    } else if (tabValue === 1) {
      setCenterLabel("$189,150");
    }
    setActiveIndex(null);
  };

  const handlePieClick = (data, index) => {
    setExpandedFund(currentFunds[index].name);
  };

  const handleAccordionChange = (panel) => (_, isExpanded) => {
    setExpandedFund(isExpanded ? panel : null);
  };

  return (
    <Box
      sx={{
        padding: 4,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      {/* Tabs for Navigation */}
      <Tabs
  value={tabValue}
  onChange={handleTabChange}
  centered
  sx={{
    marginTop: 4,
    "& .MuiTab-root": {
      textTransform: "none",
      fontSize: 18,
      fontWeight: "bold",
      color: "#495057",
      borderRadius: "25px", 
      padding: "6px 16px", 
      backgroundColor: "transparent", 
      "&.Mui-selected": {
        color: "#495057", 
        backgroundColor: "#F1F1F1", 
      },
    },
    "& .MuiTabs-indicator": {
      display: "none", 
    },
  }}
>
  <Tab label="TSP Holdings" />
  <Tab label="Look Through Holdings" />
</Tabs>

      {/* Pie Chart */}
      <Box className="pie-chart-container" position="relative" display="inline-block">
        <PieChart width={400} height={400}>
          <Pie
            data={currentFunds}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            startAngle={90}
            endAngle={-270}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handlePieClick} 
            focusable={false} 
            dataKey="value"
          >
            {currentFunds.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="#FFF"
                strokeWidth={activeIndex === index ? 3 : 9}
                outerRadius={index === activeIndex ? 100 : 120}
              />
            ))}
          </Pie>
        </PieChart>
        <Box
          sx={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: 18,
              fontWeight: "bold",
              color: activeIndex !== null ? "#FFFFFF" : "#495057",
              backgroundColor: activeIndex !== null ? COLORS[activeIndex % COLORS.length] : "transparent",
              borderRadius: "12px",
              display: "inline-block",
              padding: "2px 6px",

            }}
          >
            {activeIndex !== null ? currentFunds[activeIndex].name : "TSP Total"}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: 40,
              fontWeight: "Semi bold",
              color: "#262627",
            }}
          >
            {centerLabel}
          </Typography>
        </Box>
      </Box>

      {/* Fund Table */}
      <TableContainer component={Paper} sx={{ maxWidth: 500, marginTop: 0 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: 18, color: "#A3A7AA" }}>Items</TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", fontSize: 18, color: "#A3A7AA" }}
              >
                Total Value
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFunds.map((fund) => (
              <TableRow key={fund.name}>
                <TableCell colSpan={2}>
                  <Accordion
                    expanded={expandedFund === fund.name}
                    onChange={handleAccordionChange(fund.name)}
                    sx={{
                      boxShadow: "none", 
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography

                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#FFFFFF", 
                          backgroundColor: 
                            fund.name === "C Fund" ? "#044F79" :
                            fund.name === "G Fund" ? "#75787B" :
                            fund.name === "I Fund" ? "#BAC8E5" :
                            fund.name === "Y Fund" ? "#344767" :
                            fund.name === "S Fund" ? "#262627" :
                            fund.name === "F Fund" ? "#21B8FD" :
                            "transparent", 
                          borderRadius: "8px",
                          padding: "4px 8px", 
                        }}
                        
                      >
                        {fund.name}
                      </Typography>
                      <Typography sx={{ marginLeft: "auto" }}>
                        ${fund.value.toLocaleString()}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* Dropdown Detailed Information */}
                      <Box>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 18, color: "#495057" }}
                        >
                          Risk Level: <span style={{ fontWeight: "normal" }}>10</span>
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 18, color: "#495057" }}
                        >
                          <hr />
                          Examples:{" "}
                          <span style={{ fontWeight: "normal" }}>
                            Apple, Google, Microsoft, Meta, Tesla
                          </span>
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "bold", fontSize: 18, color: "#495057" }}
                        >
                          <hr />
                          Description:{" "}
                          <span style={{ fontWeight: "normal" }}>
                            { "Very volatile, will reap the most rewards from good years and the worst losses of bad years"}
                          </span>
                        </Typography>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default App;
