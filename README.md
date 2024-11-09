# AI Image Generation Website

Welcome to the AI Image Generation Website! This platform allows users to generate images using AI and share their creations on a community page. The project includes both a frontend client built with Vite (React + JavaScript) and a backend server built with Node.js, Express, MongoDB, and Cloudinary.

## Features

- **AI Image Generation**: Generate images using a machine learning model from Hugging Face.
- **Image Sharing**: Post generated images on a community page to share with others.
- **Cloud Storage**: Images are securely stored using Cloudinary.
- **Community Interaction**: View, comment, and interact with images shared by other users.

## Tech Stack

- **Frontend**: Vite (React + JavaScript)
- **Backend**: Node.js, Express.js, MongoDB (Atlas), Cloudinary
- **Machine Learning**: Hugging Face model for image generation

## Project Setup

### Prerequisites

1. **Node.js**: Ensure Node.js is installed.
2. **Vite**: Vite is used for setting up the client.
3. **MongoDB Atlas**: Set up a MongoDB cluster and store credentials in the `.env` file.
4. **Cloudinary**: Set up a Cloudinary account for image storage.
5. **Hugging Face API Key**: Obtain an API key for Hugging Face's image generation model.

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AI-Image-Generation-Website.git
cd AI-Image-Generation-Website
```

#### 2. Set Up Environment Variables

Create a `.env` file in the `server` folder and add your environment variables:

```bash
# MongoDB
MONGO_URI=your_mongodb_connection_string

# Hugging Face API
HUGGING_FACE_API_KEY=your_hugging_face_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### 3. Install Dependencies

- **Backend**:

  ```bash
  cd server
  npm install
  ```

- **Frontend**:

  ```bash
  cd client
  npm install
  ```

### Starting the Development Servers

- **Backend**:

  ```bash
  cd server
  npm start
  ```

- **Frontend**:

  ```bash
  cd client
  npm run dev
  ```

## Folder Structure

```plaintext
AI-Image-Generation-Website/
├── client/            # Frontend code (React + Vite)
├── server/            # Backend code (Node.js + Express)
└── README.md          # Project documentation
```

## Code Snippets

### Fetch Image Generation from Hugging Face API

The following code demonstrates how to call the Hugging Face API for image generation:

```javascript
const generateImage = async (prompt) => {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/your-model-id', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: prompt }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating image:', error);
  }
};
```

### Upload Image to Cloudinary

The following code shows how to upload an image to Cloudinary:

```javascript
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'community_images',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
  }
};
```

### Connect to MongoDB Atlas

The following snippet demonstrates how to connect to MongoDB Atlas:

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for any bugs, improvements, or features.
