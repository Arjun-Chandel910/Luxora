import React, { useRef } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import {
  LocalFireDepartment as TrendingIcon,
  Landscape as MountainsIcon,
  Waves as SwimmingPoolsIcon,
  Park as TropicalIcon,
  House as FarmsIcon,
  Apartment as UrbanLivingIcon,
  BeachAccess as BeachsideIcon,
  Cabin as CabinsIcon,
  Castle as CastlesIcon,
  DirectionsBoat as HouseboatsIcon,
  Forest as ForestsIcon,
  HotTub as HotTubsIcon,
  Villa as VillasIcon,
  Museum as HistoricHomesIcon,
  Terrain as CliffsideIcon,
  Chalet as ChaletsIcon,
  Snowboarding as SkiResortsIcon,
} from "@mui/icons-material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function Filters() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) {
      return;
    }
    const scrollAmount = 200;

    scrollRef.current.scrollBy({
      left: `${direction === "left" ? -scrollAmount : scrollAmount}`,
      behavior: "smooth",
    });
  };

  const categories = [
    { icon: <TrendingIcon />, label: "Trending" },
    { icon: <MountainsIcon />, label: "Mountains" },
    { icon: <SwimmingPoolsIcon />, label: "Swimming Pools" },
    { icon: <TropicalIcon />, label: "Tropical" },
    { icon: <FarmsIcon />, label: "Farms" },
    { icon: <UrbanLivingIcon />, label: "Urban Living" },
    { icon: <BeachsideIcon />, label: "Beachside" },
    { icon: <CabinsIcon />, label: "Cabins" },
    { icon: <CastlesIcon />, label: "Castles" },
    { icon: <HouseboatsIcon />, label: "Houseboats" },
    { icon: <ForestsIcon />, label: "Forests" },
    { icon: <HotTubsIcon />, label: "Hot Tubs" },
    { icon: <VillasIcon />, label: "Villas" },
    { icon: <HistoricHomesIcon />, label: "Historic Homes" },
    { icon: <CliffsideIcon />, label: "Cliffside" },
    { icon: <ChaletsIcon />, label: "Chalets" },
    { icon: <SkiResortsIcon />, label: "Ski Resorts" },
  ];

  return (
    <div className="flex items-center justify-center mt-6 space-x-4">
      {/*left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="p-2 rounded-full shadow-md hover:bg-[#FF5A5F] dark:hover:bg-[#FF5A5F] transition"
      >
        <KeyboardArrowLeftIcon fontSize="small" />
      </button>

      {/*scrollable Box */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          gap: 1,
          py: 1,
          overflowX: "auto",
          width: "60%",
          scrollSnapType: "x mandatory",
          "& > *": { scrollSnapAlign: "center" },
          "::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((item, index) => (
          <Card key={index} orientation="horizontal" size="sm">
            <Box sx={{ whiteSpace: "nowrap", mx: 1 }}>
              <Typography level="title-md">{item.icon}</Typography>
              <Typography level="body-sm">{item.label}</Typography>
            </Box>
          </Card>
        ))}
      </Box>

      {/*right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="p-2 rounded-full shadow-md hover:bg-[#FF5A5F] dark:hover:bg-[#FF5A5F] transition"
      >
        <KeyboardArrowRightIcon fontSize="small" />
      </button>
    </div>
  );
}
