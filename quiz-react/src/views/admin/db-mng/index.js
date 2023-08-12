import React, { useState } from "react";
import PageDetails from "../../../components/_page_details";
import { databaseBackup } from "../../../services/admin/db-mng.service.js";

const CPUHealth = () => {

    const [downloading, setDownloading] = useState(false);

  const downloadBackup = async () => {
    try {
        setDownloading(true);
      let response = await databaseBackup();
      console.log(response);
      // Create a blob URL from the response data
      const blob = new Blob([response.data], { type: 'application/zip' });
      const downloadUrl = URL.createObjectURL(blob);

      // Create a link and click it to trigger the download
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'backup.zip';
      a.click();

      // Clean up the blob URL after the download
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.log(error.message || error);
    } finally {
        setDownloading(false);
    }
  };

  return (
    <>
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          Database Management
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3">
          <button disabled={downloading}
            onClick={downloadBackup}
            className="text-indigo-500 py-2 bg-slate-800 border border-gray-600 px-4 rounded inline-flex items-center hover:bg-slate-900"
          >
            {/* download backup */}
            <span className="mr-2">Download Backup</span>
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 48 48"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h48v48H0z" fill="none" />
              <g id="Shopicon">
                <polygon points="22,4 22,23.172 14,15.172 11.171,18 24,30.828 36.829,18 34,15.172 26,23.172 26,4 	" />
                <path d="M8,44h32c2.206,0,4-1.794,4-4V30h-4v10H8V30H4v10C4,42.206,5.794,44,8,44z" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <p className="text-yellow-200 bg-yellow-500 bg-opacity-30 px-2 py-2 rounded text-center mt-2">
        working on it
      </p>
    </>
  );
};

export default CPUHealth;
