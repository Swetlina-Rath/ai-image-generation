import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';


const CreatePost = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const generateImg = async () => {
      if (form.prompt) {
          try {
              setGeneratingImg(true);
              const response = await fetch("https://ai-image-generation-v8h7.onrender.com/api/v1/dalle", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ prompt: form.prompt }),
              });
              const data = await response.json();
              setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
          } catch (error) {
              alert(error);
          } finally {
              setGeneratingImg(false);
          }
      } else {
          alert('Please enter a prompt');
      }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
        setLoading(true);
        try {
            const response = await fetch('https://ai-image-generation-v8h7.onrender.com/api/v1/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            await response.json();
            navigate('/');
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    } else {
        alert('Please enter a prompt and generate an image');
    }
};
  

  const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="max-w-7xl mx-auto mt-20 bg-[#f5ebe0] rounded-2xl shadow-2xl ">
    <div className='w-full p-5'>
      <form className=" w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row w-full pt-10 gap-10">
        <div className='flex flex-col gap-5 lg:w-[1200px] justify-between p-10'>

        <h1 className="font-extrabold font-serif text-[#000000] md:text-[60px] text-[30px]">
          Generate Image
        </h1>
        <p className="mt-2 text-[#242c33] text-[16px] text-justify">
        Transform your ideas into stunning visuals with powerful AI image generators at your fingertips. Watch as your words become beautiful images, perfectly suited for any project. Design with imagination and creativity, creating visuals that truly stand out. Share your unique creations with the community and inspire others.
        </p>
      
          <FormField
            LabelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe" 
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A bowl of soup that looks like a monster, knitted out of wool"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          </div>
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full mr-5 h-full mt-19 flex shadow-xl justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain" />
            ) : (
              <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40" />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        
        </div>
        <div className='justify-self-center'>
        <div className="mt-5 flex gap-5 justify-self-center">
          <button
            type="button"
            onClick={generateImg}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full justify-self-center sm:w-auto px-5 py-2.5 text-center hover:scale-105"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>  
        <div className="mt-10 justify-self-center">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the art exhibit.
          </p>
          <div className='justify-self-center'>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:scale-105"
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
          </div>
        </div>
        </div>
      </form>
      </div>
    </section>
  );
};

export default CreatePost;
