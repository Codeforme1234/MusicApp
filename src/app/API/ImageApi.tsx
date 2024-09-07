interface PixabayImageData {
  webformatURL: string;
}

export const fetchPixabayImageURL = async (
  text: string
): Promise<string | null> => {
  const API_KEY = "24764093-7a4f7cd04f5463d99d7dc8093"; // Your Pixabay API key
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${text}&image_type=photo`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.totalHits > 0) {
      const firstImage = data.hits[0];
      console.log(firstImage.userImageURL, "dfaf");
      return firstImage.userImageURL;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error fetching the image:", error);
    return null;
  }
};
