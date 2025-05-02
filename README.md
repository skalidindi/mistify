# Mistify

Mistify is a command-line utility that allows you to blur images and obtain their base64 representation. This tool is perfect for developers and designers who need to quickly process images for web applications or other projects.

## Features

- **Blur Images**: Easily apply a blur effect to your images.
- **Resize Images**: Specify the size to which the image should be resized.
- **Base64 Encoding**: Get the base64 representation of the processed image for easy embedding in web pages or applications.

## Prerequisites

- Node.js (version 22 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mistify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mistify
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

Run the command-line utility with the required options:

```bash
node --experimental-strip-types mistify.ts --file path/to/image.jpg --size 300
```

### Options

- `-f, --file <path>`: Path to the image file you want to
- `-s, --size <number>`: Size to resize the image to (e.g., 300 for 300x300 pixels).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the developers of [sharp](https://github.com/lovell/sharp) for the image processing library.
- Inspired by my need to efficiently load images by preloading a blurred image using the `blurDataURL` Image component property in Next.js
