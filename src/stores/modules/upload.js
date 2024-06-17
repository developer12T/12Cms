import { defineStore } from 'pinia'
import axios from 'axios'

export const useUploadStore = defineStore('upload', {
  state: () => ({
    selectedImage: null,
    imageName: null,
    path: null,
  }),
  actions: {
    setSelectedImage(image) {
      this.selectedImage = image;
    },
    async uploadResizedImage() {
      try {
        const resizedImage = await this.resizeImage(this.selectedImage);
        const formData = new FormData();
        formData.append('StoreImage', resizedImage);

        const response = await axios.post(
          import.meta.env.VITE_API_BASE_URL + '/cms/store/uploadImg',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        );
        // console.log(response.data.additionalData)
        const result = response.data.additionalData;
        this.imageName = result.ImageName;
        this.path = result.path;
        if (response.status === 200) {
          console.log('อัปโหลดรูปภาพสำเร็จ', this.imageName)
        } else {
          console.error('มีปัญหาในการอัปโหลดรูปภาพ')
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการอัปโหลด', error)
      }
    },
    async resizeImage(image) {
        return new Promise((resolve) => {
          const MAX_RESOLUTION = 500;
          const img = new Image();
          img.onload = () => {
            let width = img.width;
            let height = img.height;
      
            if (width > height && width > MAX_RESOLUTION) {
              height *= MAX_RESOLUTION / width;
              width = MAX_RESOLUTION;
            } else if (height > MAX_RESOLUTION) {
              width *= MAX_RESOLUTION / height;
              height = MAX_RESOLUTION;
            }
      
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
      
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
      
            canvas.toBlob(
              (blob) => {
                const resizedFile = new File([blob], image.name, {
                  type: 'image/jpeg',
                });
                resolve(resizedFile);
              },
              'image/jpeg',
              1
            );
          };
      
          img.src = URL.createObjectURL(image);
        });
      },      
  },
});
