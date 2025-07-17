import {
  setPreviewImages,
  cancelPreview,
} from '../GalleryReducer/galleryReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FiDownload } from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import './style.css'

const ImageUploadAndConvert = () => {
  const { previewImage } = useSelector((state) => state.gallery);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    
    try {
      const imageUrl = await generateImageFromPrompt(prompt);
      dispatch(setPreviewImages(imageUrl));
    } catch (e) {
      setError(e.message);
      console.error("Generation failed:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if(!previewImage) return;

    const link = document.createElement('a');
    link.href = previewImage

    const fileName = `Ai-image-${prompt.substring(0,20) || Date.now()}.png`
    link.download = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase()

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const generateImageFromPrompt = async (promptText) => {
    try {
      const response = await fetch('https://ai-image-server-j7mh.onrender.com/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const { image } = await response.json();
      return `data:image/png;base64,${image}`;
    } catch (error) {
      console.error('Generation error:', error);
      throw error;
    }
  };

  const onClickReloadImage = async () => {
     if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const newImageUrl = await generateImageFromPrompt(prompt);
      dispatch(setPreviewImages(newImageUrl)); 
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {!previewImage ? (
        <div>
          <h3 style={{padding:'10px'}}>Enter Prompt to Generate Ai-Style Image</h3>
          <div>
              <input 
              type="text" 
              onChange={handlePromptChange} 
              value={prompt}
              placeholder="Describe your Ai scene..."
              disabled={isLoading}
            />
            <button 
              type="button" 
              className='generate-button btn btn-primary'
              onClick={handleGenerate}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>
      ) : (
        <>
          <h2>Ai-Styled Preview</h2>
          <div className='img-container'>
            <img className='image' src={previewImage} alt='ai generted' width='410' height='290'/>
          </div>
          <div className='container'>
              <div className='butn-container'>
                <button className='btn btn-primary' type="button" onClick={onClickReloadImage}>
                  {isLoading ? 'Reloading...' : 'Reload'}
                </button>
                <button type='button' className='btn btn-primary' onClick={handleDownload}>
                  <FiDownload style={{fontSize:'25px'}}/>
                </button>
                <button className='btn btn-danger' type="button" onClick={() => dispatch(cancelPreview())}>
                  <MdCancel style={{fontSize:'25px'}}/>
                </button>
            </div>
          </div>
          
        </>
      )}
    </div>
  );
};

export default ImageUploadAndConvert;