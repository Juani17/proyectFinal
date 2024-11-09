// Importing necessary components and styles
import { AdministrationAside } from "../../../../UI/Administration/Aside/AdministrationAside"; // Sidebar component for administration menu
import ListCategories from "../../../../UI/Administration/Categories/ListCategories/ListCategories"; // Component for displaying the list of categories
import { AdministrationHeader } from "../../../../UI/Administration/Header/AdministrationHeader"; // Header component for administration page
import styles from "./Categories.module.css"; // Importing CSS module for styling

// Functional component to render Categories page
export const Categories = () => {
  return (
    <>
      {/* Render the Administration Header at the top of the page */}
      <AdministrationHeader />
      
      {/* Main content container */}
      <div className={styles.mainContent}>
        
        {/* Render the Sidebar (Aside) with administrative options */}
        <AdministrationAside />
        
        {/* Component to display a list of categories */}
        <ListCategories />
      </div>
    </>
  );
};
