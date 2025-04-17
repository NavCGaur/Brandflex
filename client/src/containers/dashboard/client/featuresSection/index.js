import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Button, Grid } from "@mui/material";
import {
  AutoGraph,
  ContactMail,
  Campaign,
  Payments,
  Bolt,
  Api,
  Build,
  Devices,
  VideoCameraFront,
  ContentPaste,
  QueryStats,
  Security
} from "@mui/icons-material";
import FlexBetween from "../../../../components/flexbetween";

const FeatureCard = ({ title, description, icon, ctaText }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery("(max-width: 599px)");
    const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1199px)");
    const isDesktop = useMediaQuery("(min-width: 1200px)");
    
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p="1.5rem"
        width="100%" // Use 100% width to fill the grid cell
        borderRadius="0.75rem"
        boxShadow={`0 2px 10px ${theme.palette.mode === 'dark' ? '#00000033' : '#ccc'}`}
        transition="transform 0.2s ease, box-shadow 0.2s ease"
        sx={{
          background: theme.palette.background.alt,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: `0 8px 20px ${theme.palette.mode === 'dark' ? '#00000055' : '#bbb'}`,
          },
          maxWidth: isMobile ? "100%" : isTablet ? "280px" : "320px",
          margin: isMobile ? "0 auto" : "inherit"
        }}
      >
        <Box>
          <FlexBetween mb="1rem">
            <Box
              sx={{
                backgroundColor: theme.palette.secondary[300],
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {icon}
            </Box>
          </FlexBetween>
          
          <Typography
            variant="h5"
            fontWeight={600}
            mb="0.75rem"
            color={theme.palette.secondary[100]}
          >
            {title}
          </Typography>
          
          <Typography
            variant="body1"
            color={theme.palette.text.secondary}
            mb="1.5rem"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical"
            }}
          >
            {description}
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          sx={{
            color: theme.palette.secondary.light,
            borderColor: theme.palette.secondary.light,
            '&:hover': {
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              borderColor: theme.palette.secondary.light
            },
            alignSelf: "flex-start",
            mt: "auto"
          }}
        >
          {ctaText}
        </Button>
      </Box>
    );
  };

const FeaturesSection = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1199px)");
  const isMobile = useMediaQuery("(max-width: 599px)");

  const featuresData = [
    {
      title: "Lead Generation",
      description: "Capture and convert leads with customizable forms, landing pages, and automated follow-ups.",
      icon: <AutoGraph sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Explore Feature"
    },
    {
      title: "Email Marketing",
      description: "Create and send professional email campaigns with drag-and-drop editors and detailed analytics.",
      icon: <ContactMail sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Learn More"
    },
    {
      title: "SMS Campaigns",
      description: "Engage customers with personalized SMS messages and automated text marketing campaigns.",
      icon: <Campaign sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Get Started"
    },
    {
      title: "Payments",
      description: "Process payments and subscriptions directly within your marketing funnels.",
      icon: <Payments sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "View Details"
    },
    {
      title: "Automation",
      description: "Build complex automation workflows triggered by customer actions and behaviors.",
      icon: <Bolt sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Set Up Now"
    },
    {
      title: "API Access",
      description: "Connect with your favorite tools and extend functionality with our developer-friendly API.",
      icon: <Api sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "View Docs"
    },
    {
      title: "Custom Tools",
      description: "Create specialized tools and applications tailored to your business requirements.",
      icon: <Build sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Customize"
    },
    {
      title: "Multi-Platform",
      description: "Manage your marketing campaigns across web, mobile, and desktop platforms seamlessly.",
      icon: <Devices sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "See Platforms"
    },
    {
      title: "Video Marketing",
      description: "Host, share, and track engagement with your video content directly in the platform.",
      icon: <VideoCameraFront sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Try It Out"
    },
    {
      title: "CRM Suite",
      description: "Manage customer relationships and track interactions throughout the customer journey.",
      icon: <ContentPaste sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Explore CRM"
    },
    {
      title: "Analytics",
      description: "Get detailed insights into campaign performance with comprehensive reporting tools.",
      icon: <QueryStats sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "View Reports"
    },
    {
      title: "Security",
      description: "Enterprise-grade security to protect your data and maintain compliance with regulations.",
      icon: <Security sx={{ color: theme.palette.background.alt, fontSize: "24px" }} />,
      ctaText: "Learn About Security"
    }
  ];

  return (
    <Box m={isMobile ? "1rem" : "1.5rem 2.5rem"}>
      <FlexBetween flexDirection={isMobile ? "column" : "row"} gap={isMobile ? "1rem" : "0"} mb="2rem">
        <Box>
          <Typography 
            variant="h2" 
            fontWeight={600} 
            color={theme.palette.secondary[100]}
          >
            Platform Features
          </Typography>
          <Typography 
            variant="h5" 
            color={theme.palette.secondary[300]}
            mt="0.5rem"
          >
            All the tools you need to grow your business
          </Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            '&:hover': {
              backgroundColor: theme.palette.secondary[300],
            }
          }}
        >
          View All Features
        </Button>
      </FlexBetween>

      <Grid container spacing={3}>
        {featuresData.map((feature, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            lg={3} 
            key={index}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              ctaText={feature.ctaText}
            />
          </Grid>
        ))}
      </Grid>

      <Box 
        mt="3rem" 
        p="2rem"
        borderRadius="0.75rem"
        backgroundColor={theme.palette.primary.main}
        boxShadow={`0 4px 20px ${theme.palette.mode === 'dark' ? '#00000066' : '#00000033'}`}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography 
              variant="h3" 
              fontWeight={600} 
              color={theme.palette.primary.alt}
              gutterBottom
            >
              Ready to supercharge your marketing?
            </Typography>
            <Typography 
              variant="h6" 
              color={theme.palette.background.paper}
            >
              Get started with our all-in-one platform today and see results faster than ever.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} display="flex" justifyContent={isMobile ? "flex-start" : "flex-end"}>
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: isMobile ? 2 : 0,
                backgroundColor: theme.palette.background.default,
                color: theme.palette.primary.main,
                fontWeight: "bold",
                padding: "12px 24px",
                '&:hover': {
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.default,
                }
              }}
            >
              Start Free Trial
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturesSection;