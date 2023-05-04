import React from "react";


export  function Content() {
  return (
    <>
      <div
        id="main-content container-fluid col-md-12"
        className="e-content-animation"
        style={{
          transition: "margin 0.5s ease 0s, transform 0.5s ease 0s",
          height: "399px",
          transform: "translateX(0px)",
          marginLeft: "220px",
        }}
      >
        <div
          className="title"
          style={{ padding: "15px", textAlign: "center", fontSize: "20px" }}
        >
          Main content
        </div>
        <div
          className="sub-title"
          style={{ padding: "10px", textAlign: "center", fontSize: "16px" }}
        >
          {" "}
          Click the expand icon to open and collapse icons to close the Sidebar.
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
body {
  margin: 0px;
}
`,
        }}
      />
    </>
  );
}


export default function Sidebar() {
  return (
    <><>
          <aside
              id="dockSidebar"
              className="e-control e-sidebar e-lib e-left e-dock e-open e-transition e-push e-touch"
              style={{
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  fontSize: "12px",
                  fontWeight: 400,
                  boxSizing: "border-box",
                  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                  position: "fixed",
                  verticalAlign: "middle",
                  willChange: "transform",
                  left: "0px",
                  right: "auto",
                //   top: "0px",
                  transition: "transform 0.5s ease 0s",
                  transform: "translateX(0%)",
                  visibility: "visible",
                  background: "rgb(45, 50, 62)",
                  overflow: "hidden",
                  borderRight: "0px",
                  height: "400px",
                  width: "220px",
                  zIndex: 1000,
              }}
          >
              <div className="dock">
                  <ul style={{ marginTop: "0px", padding: "0px" }}>
                      <li
                          id="toggle"
                          className="sidebar-item"
                          style={{
                              borderBottom: "1px solid rgba(229, 229, 229, 0.54)",
                              textAlign: "left",
                              paddingLeft: "15px",
                              color: "rgb(192, 194, 197)",
                              listStyleType: "none",
                              cursor: "pointer",
                          }}
                      >
                          <span
                              className="e-icons expand"
                              style={{
                                  fontVariant: "normal",
                                  fontFamily: "e-icons",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  textTransform: "none",
                                  color: "rgb(192, 194, 197)",
                                  lineHeight: 2,
                                  boxSizing: "border-box",
                                  marginRight: "16px",
                              }} />
                          <span
                              className="e-text"
                              title="menu"
                              style={{
                                  boxSizing: "border-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "23px",
                                  fontSize: "15px",
                                  display: "inline-block",
                              }}
                          >
                              Menu
                          </span>
                      </li>
                      <li
                          className="sidebar-item"
                          style={{
                              borderBottom: "1px solid rgba(229, 229, 229, 0.54)",
                              textAlign: "left",
                              paddingLeft: "15px",
                              color: "rgb(192, 194, 197)",
                              listStyleType: "none",
                              cursor: "pointer",
                          }}
                      >
                          <span
                              className="e-icons home"
                              style={{
                                  fontVariant: "normal",
                                  fontFamily: "e-icons",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  textTransform: "none",
                                  color: "rgb(192, 194, 197)",
                                  lineHeight: 2,
                                  boxSizing: "border-box",
                                  marginRight: "16px",
                              }} />
                          <span
                              className="e-text"
                              title="home"
                              style={{
                                  boxSizing: "border-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "23px",
                                  fontSize: "15px",
                                  display: "inline-block",
                              }}
                          >
                              Home
                          </span>
                      </li>
                      <li
                          className="sidebar-item"
                          style={{
                              borderBottom: "1px solid rgba(229, 229, 229, 0.54)",
                              textAlign: "left",
                              paddingLeft: "15px",
                              color: "rgb(192, 194, 197)",
                              listStyleType: "none",
                              cursor: "pointer",
                          }}
                      >
                          <span
                              className="e-icons profile"
                              style={{
                                  fontVariant: "normal",
                                  fontFamily: "e-icons",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  textTransform: "none",
                                  color: "rgb(192, 194, 197)",
                                  lineHeight: 2,
                                  boxSizing: "border-box",
                                  marginRight: "16px",
                              }} />
                          <span
                              className="e-text"
                              title="profile"
                              style={{
                                  boxSizing: "border-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "23px",
                                  fontSize: "15px",
                                  display: "inline-block",
                              }}
                          >
                              Profile
                          </span>
                      </li>
                      <li
                          className="sidebar-item"
                          style={{
                              borderBottom: "1px solid rgba(229, 229, 229, 0.54)",
                              textAlign: "left",
                              paddingLeft: "15px",
                              color: "rgb(192, 194, 197)",
                              listStyleType: "none",
                              cursor: "pointer",
                          }}
                      >
                          <span
                              className="e-icons info"
                              style={{
                                  fontVariant: "normal",
                                  fontFamily: "e-icons",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  textTransform: "none",
                                  color: "rgb(192, 194, 197)",
                                  lineHeight: 2,
                                  boxSizing: "border-box",
                                  marginRight: "16px",
                              }} />
                          <span
                              className="e-text"
                              title="info"
                              style={{
                                  boxSizing: "border-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "23px",
                                  fontSize: "15px",
                                  display: "inline-block",
                              }}
                          >
                              Info
                          </span>
                      </li>
                      <li
                          className="sidebar-item"
                          style={{
                              borderBottom: "1px solid rgba(229, 229, 229, 0.54)",
                              textAlign: "left",
                              paddingLeft: "15px",
                              color: "rgb(192, 194, 197)",
                              listStyleType: "none",
                              cursor: "pointer",
                          }}
                      >
                          <span
                              className="e-icons settings"
                              style={{
                                  fontVariant: "normal",
                                  fontFamily: "e-icons",
                                  fontStyle: "normal",
                                  fontWeight: 400,
                                  textTransform: "none",
                                  color: "rgb(192, 194, 197)",
                                  lineHeight: 2,
                                  boxSizing: "border-box",
                                  marginRight: "16px",
                              }} />
                          <span
                              className="e-text"
                              title="settings"
                              style={{
                                  boxSizing: "border-box",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  lineHeight: "23px",
                                  fontSize: "15px",
                                  display: "inline-block",
                              }}
                          >
                              Settings
                          </span>
                      </li>
                  </ul>
              </div>
          </aside>
          <style
              dangerouslySetInnerHTML={{
                  __html: `
body {
  margin: 0px;
}
`,
              }} />
      </><Content></Content></>
  );
}
