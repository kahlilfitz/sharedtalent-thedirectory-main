import React, { useState } from "react";
import { Box, Container, Button } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UploadType = {
  [key: string]: any;
  isBusinessLogo?: boolean;
  isProfilePhoto?: boolean;
  userId: string;
};

function Uploader({
  isBusinessLogo = false,
  isProfilePhoto = false,
  userId,
  updateUserData,
}: UploadType) {
  const [businessLogo, setBusinessLogo] = useState<any>({});
  const [profilePhoto, setProfilePhoto] = useState<any>({});
  const navigate = useNavigate();

  const {
    getRootProps: getRootfileProps,
    getInputProps: getInputfileProps,
    open: handleBusinessLogo,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    noDrag: true,
    accept: {
      "image/jpeg": [".png", ".jpg", ".jpeg"],
    },
    minSize: 0,
    maxSize: 5242880,
    onDrop: async (acceptedFile) => {
      setBusinessLogo(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );

      const data = new FormData();
      data.append("file", acceptedFile[0]);

      const uploadedFile = await axios.post(
        `/users/upload-image/${userId}/logo`,
        data,
        {
          headers: {
            withCredentials: true,
          },
        }
      );

      updateUserData({
        businessLogoUrl: uploadedFile.data,
      });
      navigate("/profile/profile-logo?logoUpdated=true");
    },
  });

  const {
    getRootProps: getRootGalleryProps,
    getInputProps: getInputGalleryProps,
    open: handleProfilePhoto,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    noDrag: true,
    accept: {
      "image/jpeg": [".png", ".jpg", ".jpeg"],
    },
    onDrop: async (acceptedFile) => {
      setProfilePhoto(
        Object.assign(acceptedFile[0], {
          preview: URL.createObjectURL(acceptedFile[0]),
        })
      );

      const data = new FormData();
      data.append("file", acceptedFile[0]);

      const uploadedFile = await axios.post(
        `/users/upload-image/${userId}/photo`,
        data,
        {
          headers: {
            withCredentials: true,
          },
        }
      );

      updateUserData({
        avatar: uploadedFile.data,
      });
      navigate("/profile/profile-photo?photoUpdated=true");
    },
  });

  return (
    <Container>
      {isBusinessLogo && (
        <Box>
          <Box {...getRootfileProps()}>
            <input
              {...getInputfileProps()}
              accept="image/png, image/jpeg, image/jpg"
            />
            <Box style={{ fontSize: ".8rem" }}>
              <Button onClick={handleBusinessLogo} name={businessLogo}>
                Upload Logo
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {isProfilePhoto && (
        <Box>
          <Box {...getRootGalleryProps()}>
            <input
              {...getInputGalleryProps()}
              accept="image/png, image/jpeg, image/jpg"
            />
            <Box style={{ fontSize: ".8rem" }}>
              <Button onClick={handleProfilePhoto} name={profilePhoto}>
                Upload Profile Pic
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default Uploader;
