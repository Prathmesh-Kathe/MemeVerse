# MemeVerse

MemeVerse is a web application for exploring, uploading, and sharing memes. It includes features like dark mode, search functionality, and AI-generated meme captions.

## Features

- **Search Memes**: Search for memes using keywords.
- **Dark Mode**: Toggle between light and dark themes.
- **Upload Memes**: Upload your own memes and get AI-generated captions.
- **Explore Memes**: Browse through a collection of memes with various filters.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/memeverse.git
    cd memeverse
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

## Usage

- **Search**: Use the search bar to find memes by keywords.
- **Dark Mode**: Click the dark mode toggle button in the navbar to switch themes.
- **Upload**: Click the "Upload Meme" button to upload an image and get an AI-generated caption.
- **Explore**: Use filters to sort and categorize memes in the explorer section.

## Components

- **SearchBar**: Handles meme search functionality with debouncing.
- **Navbar**: Navigation bar with links to different sections and dark mode toggle.
- **MemeUpload**: Component for uploading memes and generating captions.
- **MemeList**: Displays a list of memes fetched from an API.
- **MemeFilters**: Provides filtering options for memes.
- **MemeExplorer**: Combines search and filter functionalities to explore memes.
- **MemeCard**: Displays individual meme details.
- **DarkModeToggle**: Toggles between light and dark themes.
- **CaptionEditor**: Allows editing of meme captions.
- **memeAI**: API utility for generating AI captions.

## API

- **ImgBB**: Used for image uploads.
- **MemeGen**: Used for generating AI captions.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.