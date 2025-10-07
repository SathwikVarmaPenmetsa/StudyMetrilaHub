import React, { useEffect, useState } from "react";
import supabase from "../supabase";
import UseGetRole from "../Hookes/UseGetRole";

const PdfCards = () => {
  const [filedata, setFiledata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [semFilterData, setSemfilterData] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchInp, setSearchInp] = useState("");

  useEffect(() => {
    const getDataFromFiledata = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("pdfinfo").select("*");
      if (error) console.error(error);
      else {
        setFiledata(data);
      }
      setFilterData(data);

      setLoading(false);
    };
    getDataFromFiledata();
  }, []);

  const user = UseGetRole();

  // Helper to check if file is PDF or image
  const isPdf = (url) => url.toLowerCase().includes(".pdf");
  const isImage = (url) =>
    url.toLowerCase().includes(".jpeg") ||
    url.toLowerCase().includes(".jpg") ||
    url.toLowerCase().includes(".gif") ||
    url.toLowerCase().includes(".png") ||
    url.toLowerCase().includes(".webp") ||
    url.toLowerCase().includes(".bmp") ||
    url.toLowerCase().includes(".svg") ||
    url.toLowerCase().includes(".jfif");

  // handledownlode function
  const handleDownload = async (file, fileName) => {
    if (!fileName) {
      alert("Filename not found for this file.");
      return;
    }
    const { data, error } = await supabase.storage
      .from("files")
      .createSignedUrl(fileName, 60, { download: true });
    if (error) {
      alert("Download failed.");
      return;
    }
    window.open(data.signedUrl, "_blank");
  };

  //handledownlode function
  const handelDelete = async (rowid, filename) => {
    console.log("clicked");

    const { error: storageError } = await supabase.storage
      .from("files")
      .remove([filename]);
    if (storageError) {
      console.log("Error deleting file from storage:", storageError);
      return;
    }
    const { error: deleteError } = await supabase
      .from("pdfinfo")
      .delete()
      .eq("id", rowid);
    if (deleteError) {
      console.log("error omn delect a tiem for pdf table", deleteError);
    }

    setFiledata((prev) => prev.filter((f) => f.id !== rowid));
  };

  //filters group from all pfdinfo

  const AllGroupNames = filedata.map((data) => {
    return data.group.toUpperCase();
  });
  const groupNames = [...new Set(AllGroupNames)];

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // difference in seconds

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  function handelSearchFilter(e) {
    setSearchInp(e.target.value);
  }

  // applay filters
  useEffect(() => {
    let filtered = filedata;

    // apply semester filter
    if (semFilterData) {
      filtered = filtered.filter((file) => file.sem === semFilterData);
    }

    // apply group filter
    if (groupFilter) {
      filtered = filtered.filter(
        (file) => file.group.toUpperCase() === groupFilter
      );
    }

    // apply search filter
    if (searchInp) {
      filtered = filtered.filter((file) =>
        file.subject.toLowerCase().includes(searchInp.toLowerCase())
      );
    }

    setFilterData(filtered);
  }, [filedata, semFilterData, groupFilter, searchInp]);

  
  
  
  return (
    <div className="pdfCardsmainDev">
      <div className="searchAndFilters">
        <div className="searchInp">
          <input
            type="search"
            name="search"
            id="searchinp"
            placeholder="search Files..."
            onChange={(e) => handelSearchFilter(e)}
          />
        </div>
        <div className="filtersDiv">
          <label htmlFor="">FILTERES : </label>
          <select
            id="semester"
            onChange={(e) => setSemfilterData(e.target.value)}
            className="filterdSection"
          >
            <option defaultChecked value="">
              --semester --
            </option>
            <option value="1st sem">1st sem</option>
            <option value="2nd sem">2nd sem</option>
            <option value="3rd sem">3rd sem</option>
            <option value="4th sem">4th sem</option>
            <option value="5th sem">5th sem</option>
            <option value="6th sem">6th sem</option>
          </select>

          <select
            id="group"
            onChange={(e) => setGroupFilter(e.target.value)}
            className="filterdSection"
          >
            <option defaultChecked value={""}>
              --Group--
            </option>
            {groupNames
              ? groupNames.map((groupname) => {
                  return (
                    <option value={groupname} key={groupname}>
                      {groupname}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>

      <div className="pdfCardsGrid">
        {filterData && filterData.length > 0 ? (
          filterData.map((file,index) => (
            <div key={file.id} className="pdfCards" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="fileDiv">
                {isPdf(file.fileurl) || isImage(file.fileurl) ? (
                  <iframe
                    src={file.fileurl}
                    frameBorder="0"
                    width={"100%"}
                    height={"100%"}
                    title={file.subject}
                  ></iframe>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <p>
                      Preview not available.
                      <br />
                      <a
                        href={file.fileurl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download file
                      </a>
                    </p>
                  </div>
                )}
              </div>

              <div className="fileInfo">
                <h2 className="subjectName">{file.subject}</h2>
                <p>
                  <span>{file.group}</span>
                  <span>{file.sem}</span>
                </p>

                {/* View in new tab */}
                <button onClick={() => window.open(file.fileurl, "_blank")}>
                  View
                </button>
                <button onClick={() => handleDownload(file.id, file.filename)}>
                  Download
                </button>
                {user.role === "admin" || user.role === "teacher" ? (
                  <button onClick={() => handelDelete(file.id, file.filename)}>
                    Delete
                  </button>
                ) : null}
              </div>
              <p className="timeDisplay">{timeAgo(file.uploaded_at)}</p>
            </div>
          ))
        ) : loading ? (
          "loading..."
        ) : (
          <div
            style={{
              height: "100vh",
              fontSize: "30px",
              width: "100%",
              marginTop: "150px",
            }}
          >
            no files found 🧐
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfCards;
