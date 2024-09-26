// src/components/DoctorReports.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, CircularProgress, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const DoctorReports = () => {
  const { doctorId } = useParams();  // Fetch doctorId from URL params
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch doctor reports from backend API
    const fetchDoctorReports = async () => {
      try {
        // Use actual doctorId in the API URL
        const response = await axios.get(`http://127.0.0.1:8000/api/doctor/reports/${doctorId}/`);
        setReportData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchDoctorReports();
  }, [doctorId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom>Doctor's Report Overview</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Patients</Typography>
              <Typography variant="body1">{reportData.total_patients}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Weekly Appointments</Typography>
              <Typography variant="body1">{reportData.weekly_appointments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Monthly Appointments</Typography>
              <Typography variant="body1">{reportData.monthly_appointments}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Status Breakdown</Typography>
              {reportData.status_breakdown.map((status, index) => (
                <Typography key={index} variant="body2">
                  {status.status}: {status.count}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorReports;
