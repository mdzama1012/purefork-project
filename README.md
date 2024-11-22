# Food ordering app using React

## Basic UI Layout

- Header
  - Logo
  - Nav-Links
- Main / Body
  - Search
  - Restaurant Container
    - Restaurant Card
    - Restaurant Logo
    - Cuisine
    - Rating
    - Delivery Time
- Footer
  - Copyright content
  - Social Media Links
  - Other Links
  - Contact Us Section

## Using FontAwesome in Project.

1. **Install Packages**:
   Use npm to install FontAwesome:

   ```
   npm i @fortawesome/fontawesome-svg-core
   npm i @fortawesome/free-solid-svg-icons
   npm i @fortawesome/react-fontawesome
   ```

2. **Import Components**:
   In your component, import `FontAwesomeIcon` and the icons you want to use:

   ```javascript
   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
   import { faCoffee } from '@fortawesome/free-solid-svg-icons';
   ```

3. **Use the Icon**:
   Include the icon in your JSX like this:
   ```jsx
   <FontAwesomeIcon icon={faCoffee} />
   ```

This process allows you to easily add scalable icons to your React application.
