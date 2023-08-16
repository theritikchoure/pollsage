import React, { useEffect, useState } from "react";
import PageDetails from "../../../components/_page_details";
import {
  databaseBackup,
  importData,
  getCollections,
} from "../../../services/admin/db-mng.service.js";
import {
  dismissToast,
  errorToast,
  loadingToast,
  warningToast,
} from "../../../utils/toaster";

const DBMng = () => {
  const [collections, setCollections] = useState(null);
  const [downloading, setDownloading] = useState(false);

  const [file, setFile] = useState(null);

  // exportCollection
  const [selectedExportCollection, setSelectedExportCollection] =
    useState(null);
  const [selectedImportCollection, setSelectedImportCollection] =
    useState(null);

  const [operationOption, setOperationOption] = useState("Import");

  const handleOptionClick = (option) => {
    if (option === "Import") {
      setSelectedExportCollection(null);
    }

    setOperationOption(option);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let response = await getCollections();
      console.log(response.data);
      setCollections(response.data);
    } catch (error) {
      console.log(error?.message || error);
    }
  };

  const downloadBackup = async (type, collection) => {
    try {
      if (type === "json" && !collection) {
        errorToast("Please select a collection to export", {
          position: "top-center",
        });
        return;
      }

      setDownloading(true);
      loadingToast("Downloading backup...", { position: "top-center" });
      let response = await databaseBackup(collection);
      console.log(response);
      if (response.headers["content-type"] === "application/json") {
        console.log(response);
        const blob = new Blob([response.data], { type: "application/json" });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${collection}.json`;
        a.click();
        URL.revokeObjectURL(downloadUrl);
      } else if (response.headers["content-type"] === "application/zip") {
        // Create a blob URL from the response data
        const blob = new Blob([response.data], { type: "application/zip" });
        const downloadUrl = URL.createObjectURL(blob);

        // Create a link and click it to trigger the download
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "backup.zip";
        a.click();

        // Clean up the blob URL after the download
        URL.revokeObjectURL(downloadUrl);
      } else {
        alert("Invalid file type.");
      }

      dismissToast();
    } catch (error) {
      console.log(error);
    } finally {
      setDownloading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleImport = async () => {
    if (!selectedImportCollection) {
      errorToast("Please select a collection to import", {
        position: "top-center",
      });
      return;
    }

    if (!file) {
      errorToast("Please select a file to import", {
        position: "top-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await importData(formData);

      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
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
          <button
            disabled={downloading}
            onClick={() => downloadBackup("zip", null)}
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

      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-2">
          <div
            onClick={() => handleOptionClick("Import")}
            className={`w-full text-center border ${
              operationOption === "Import"
                ? "border-indigo-500 bg-gray-800"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            Import Data
          </div>
          <div
            onClick={() => handleOptionClick("Export")}
            className={`w-full text-center border ${
              operationOption === "Export"
                ? "border-indigo-500 bg-gray-800"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            Export Data
          </div>
        </div>
        {operationOption === "Import" && (
          <div className="mt-8">
            <div className="border border-red-500 py-3 px-2 text-red-500 rounded flex items-center mb-5">
              <div className="ml-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"></path>
                </svg>
              </div>
              <div className="ml-2">
                Warning: This feature allows you to restore the database. Make
                sure you have already downloaded a backup of the collection data
                before proceeding. Restoring the database will overwrite
                existing data.
              </div>
            </div>
            <h4 className="text-slate-100 font-bold text-xl mb-4">
              Import Collection
            </h4>

            <div className="grid grid-cols-3 lg:grid-cols-3 gap-4 mb-6">
              <div className="w-full">
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    className="relative z-20 w-full !appearance-none rounded border border-gray-600 
                    bg-gray-800 py-4 px-5 outline-none transition focus:border-primary active:border-primary 
                    dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) =>
                      setSelectedImportCollection(e.target.value)
                    }
                    value={selectedImportCollection}
                  >
                    <option className="text-white capitalize" value={""}>
                      Select collection
                    </option>
                    {collections &&
                      collections.map((collection, index) => (
                        <option
                          value={collection.name}
                          key={index}
                          className="h-4 text-white capitalize checked:bg-gray-900"
                        >
                          {collection.name}
                        </option>
                      ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="w-full">
                <input
                  type="file"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                  `}
                  onChange={handleFileChange}
                  // value={file}
                />
              </div>
              <div className="w-full">
                <button
                  onClick={() => handleImport("hello")}
                  className="w-full bg-indigo-500 text-white py-4 px-5 rounded"
                >
                  Import
                </button>
              </div>
            </div>
            {(selectedImportCollection || file) && <div className="bg-orange-400 border border-orange-500 py-3 px-2 text-white rounded mb-4">
            Warning: Please ensure that you are selecting a file with valid data. Any validation failure can have a significant impact on the database and the existing data. Make sure to review the file content carefully before proceeding with the restoration process.
            </div> }

            <h4 className="text-slate-100 font-bold text-xl mb-4">
              Restore Whole Database
            </h4>
            <div className="bg-slate-900 mt-4 mb-6">
              <div className="border border-dashed h-32">
                {/* file upload input*/}
                <div className="relative flex flex-col items-center justify-center h-full">
                  <svg
                    className="w-8 h-8 text-gray-400 hover:text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      stroke-linecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span>Drag and drop</span> files here or{" "}
                    <span className="text-indigo-500 hover:underline cursor-pointer">
                      select a file
                    </span>{" "}
                    from your computer
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 z-50 w-full h-full outline-none opacity-0 cursor-pointer"
                  />
                </div>

                {/* upload button */}
              </div>
              <div className="mt-6 border border-red-500 text-red-500 p-6">
                <p className="font-bold">
                  **Warning: Whole Database Restoration**
                </p>
                <br />
                <p>
                  You are about to restore the entire database using the
                  contents of the selected backup file. This action will replace
                  all existing data in the database with the data from the
                  backup file. Any modifications made to the current data will
                  be lost, and the database will be rolled back to the state at
                  the time the backup was created.{" "}
                </p>
                <br />
                <p>Please ensure the following: </p>
                <br />
                <ol>
                  <li>
                    1. You have a backup of the current database in case you
                    need to revert the changes.
                  </li>
                  <li>
                    2. Confirm that you have selected the correct backup file
                    for restoration.
                  </li>
                  <li>
                    3. All collections in the database will be replaced with the
                    data from the backup file.
                  </li>
                </ol>
                <br />
                Do you want to proceed with the whole database restoration?
              </div>
              <div className="mt-6 flex">
                <button className="px-5 py-1 border border-red-500 hover:text-white hover:bg-red-500 text-red-500 rounded">
                  Cancel
                </button>
                <button className="ml-3 px-5 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded">
                  Restore Database
                </button>
              </div>
            </div>
          </div>
        )}
        {operationOption === "Export" && (
          <div className="mt-8">
            <h4 className="text-slate-100 font-bold text-xl mb-4">
              Export Collection
            </h4>

            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
              <div className="w-full">
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    className="relative z-20 w-full !appearance-none rounded border border-gray-600 
                    bg-gray-800 py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                    dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    value={selectedExportCollection || ""}
                    onChange={(e) =>
                      setSelectedExportCollection(e.target.value)
                    }
                  >
                    <option className="text-white capitalize" value={""}>
                      Select collection
                    </option>
                    {collections &&
                      collections.map((collection, index) => (
                        <option
                          value={collection.name}
                          key={index}
                          className="h-4 text-white capitalize checked:bg-gray-900"
                        >
                          {collection.name}
                        </option>
                      ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="w-full">
                <button
                  onClick={() =>
                    downloadBackup("json", selectedExportCollection)
                  }
                  className="w-full bg-indigo-500 text-white py-3 px-5 rounded"
                >
                  Export
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DBMng;
