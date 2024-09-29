import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import '../styles/Download.css'; // Import your CSS file

const Download = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`download-page ${theme}`}>
      <h1 className="download-page__title">Download LawAI Application</h1>
      <p className="download-page__description">
        Choose your platform to download the LawAI installation file:
      </p>

      <div className="download-page__options">
        <a href="/path/to/android-apk-file.apk" download className="download-page__btn" id='android'>
          <img src="https://pngimg.com/d/android_logo_PNG2.png" alt="Android" className="download-page__logo" />
          Download APK for Android
        </a>

        <a href="/path/to/ios-apk-file.ipa" download className="download-page__btn">
          <img src="https://www.freeiconspng.com/thumbs/ios-png/app-ios-png-4.png" alt="iOS" className="download-page__logo" />
          Download for iOS
        </a>
        <p className="coming-soon">Coming Soon!</p> {/* Coming Soon for iOS */}

        <a href="/path/to/linux-apk-file.deb" download className="download-page__btn">
          <img src="https://seeklogo.com/images/L/linux-logo-704D6BB91C-seeklogo.com.png" alt="Linux" className="download-page__logo" />
          Download for Linux
        </a>
        <p className="coming-soon">Coming Soon!</p> {/* Coming Soon for Linux */}

        <a href="/path/to/windows-apk-file.exe" download className="download-page__btn">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Windows_logo_-_2021.svg/2048px-Windows_logo_-_2021.svg.png" alt="Windows" className="download-page__logo" />
          Download for Windows
        </a>
        <p className="coming-soon">Coming Soon!</p> {/* Coming Soon for Windows */}
      </div>
    </div>
  );
};

export default Download;
