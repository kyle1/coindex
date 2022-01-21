import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AutoComplete } from "primereact/autocomplete";
import styled from "styled-components";
import SectionEdit from "./SectionEntryEdit";
import Modal from "../../components/Modal";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";
import { SectionEntry } from "../../models/SectionEntry";
import { AssetTag } from "../../models/AssetTag";
import CoinCalendar from "./calendar/CoinCalendar";
import ScrollPanel from "primereact/scrollpanel";

const Container = styled.div`
  margin: 10px;
  font-size: 12px;

  .p-autocomplete .p-autocomplete-multiple-container {
    padding: 0;
  }

  .p-autocomplete ul {
    margin-block-start: 0px;
    margin-inline-start: 5px;
    padding-inline-start: 15px;
  }

  .p-autocomplete-multiple-container {
    height: 30px;
    /* padding: 0; */
  }

  .p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token {
    height: 20px;
    font-size: 12px;
  }

  .badge {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    padding: 0;
    background: #c298d8;
    color: #151515;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 1rem;
    height: 1rem;
    line-height: 1rem;
  }

  a {
    color: white;
  }
  ul {
    margin-block-start: 5px;
    margin-inline-start: 5px;
    padding-inline-start: 15px;
  }
  .link {
    color: white;
    text-decoration: none;
  }
`;

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;

  p {
    margin: 0px;
  }
`;

const StyledCard = styled.div`
  /* display: flex;
  place-self: center;
  border-top-width: 8px;
  border-top-color: #435971;
  border-radius: 0.25rem;
  background-color: rgb(25, 25, 25);
  color: var(--primary-text) !important;
  width: 450px; */
  background: rgb(20, 20, 20);
  color: rgba(255, 255, 255, 0.87);
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
    0 1px 3px 0 rgb(0 0 0 / 12%);
  border-radius: 5px;
  padding: 5px;
`;

const StyledCardBody = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  //padding: 1.25rem;
  height: 100px;
  overflow-y: auto;
`;

interface CoinProps {}

const Coin: React.FC<CoinProps> = (props: CoinProps) => {
  console.log("Coin evaluated");

  const { id } = useParams();
  const [asset, setAsset] = useState<Asset>();
  const [tags, setTags] = useState<AssetTag[]>([]);
  const [filteredTags, setFilteredTags] = useState<any>(null);
  const [selectedTags, setSelectedTags] = useState<AssetTag[]>([]);

  const [selectedEntry, setSelectedEntry] = useState<SectionEntry>();
  const [showEntryEdit, setShowEntryEdit] = useState<boolean>(false);

  // const saveAsset = (asset: any) => {
  //   console.log("saving asset...");
  //   let options: any = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(asset),
  //   };
  //   fetch(`${apiBaseUrl}/assets`, options)
  //     .then((response) => response.json())
  //     .then(
  //       () => console.log("save completed"),
  //       (error) => console.log(error)
  //     );
  // };

  const searchTag = (event: { query: string }) => {
    setTimeout(() => {
      let _filteredTags;
      if (!event.query.trim().length) {
        _filteredTags = [...tags];
      } else {
        _filteredTags = tags.filter((tag) => {
          return tag.tagName.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      setFilteredTags(_filteredTags);
    }, 250);
  };

  const getAsset = (id: number) => {
    fetch(`${apiBaseUrl}/assets/${id}`)
      .then((response) => response.json())
      .then(
        (asset: Asset) => {
          console.log(asset);
          document.title = asset.assetName;
          setAsset(asset);
          setSelectedTags(asset.tags!);
        },
        (error) => console.log(error)
      );
  };

  const getTags = () => {
    fetch(`${apiBaseUrl}/tags`)
      .then((response) => response.json())
      .then(
        (tags: AssetTag[]) => setTags(tags),
        (error) => console.log(error)
      );
  };

  const saveAssetTag = (tag: AssetTag) => {
    let options: any = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    };
    fetch(`${apiBaseUrl}/assets/${id}/tags`, options)
      .then((response) => console.log(response))
      .then(
        () => {},
        (error) => console.log(error)
      );
  };

  const deleteAssetTag = (tag: AssetTag) => {
    let options: any = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tag),
    };
    fetch(`${apiBaseUrl}/assets/${id}/tags/${tag.assetTagId}`, options)
      .then((response) => console.log(response))
      .then(
        () => {},
        (error) => console.log(error)
      );
  };

  const handleTagSelect = (tag: AssetTag) => {
    console.log("handling tag select...");
    console.log(tag);
    saveAssetTag(tag);
  };

  const handleTagUnselect = (tag: AssetTag) => {
    console.log("handling tag unselect...");
    console.log(tag);
    deleteAssetTag(tag);
  };

  const handleEntryEditClick = (entry?: SectionEntry) => {
    console.log(entry);
    setSelectedEntry(entry);
    setShowEntryEdit(true);
  };

  const handleEntrySave = () => {
    setShowEntryEdit(false);
    getAsset(+id!);
  };

  const getBadgeStyle = (rating: number | undefined) => {
    if (!rating) return { display: "none" };

    let bg = "white";
    if (rating === 1) bg = "red";
    else if (rating === 2) bg = "orange";
    else if (rating === 3) bg = "yellow";
    else if (rating === 4) bg = "lightgreen";
    else bg = "forestgreen";
    return { background: bg };
  };

  useEffect(() => {
    getTags();
    getAsset(+id!);
  }, []);

  return (
    <>
      {showEntryEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowEntryEdit(false)}>
          <SectionEdit
            assetId={+id!}
            entry={selectedEntry!}
            onSave={handleEntrySave}
            onCancel={() => setShowEntryEdit(false)}
          />
        </Modal>
      )}
      <Container>
        {asset && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "10px", fontSize: "1.1rem", fontWeight: "bold" }}>
                  <img src={`/images/assets/${asset.ticker}.png`} style={{ width: "25px" }} />
                  {asset!.assetName} ({asset!.ticker})
                  <i
                    className="fas fa-plus"
                    style={{ fontSize: "10px", paddingLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleEntryEditClick(undefined)}
                  ></i>
                </div>
                {/* <b>Website:</b>&nbsp;
                <a href={asset!.website} className="link">
                  {asset!.website}
                </a>
                <br />
                <b>Subreddit:</b>&nbsp;
                <a href={`https://reddit.com/${asset!.subreddit}`} className="link">
                  {asset!.subreddit}
                </a> */}
              </div>
              <div>
                Tags:
                <AutoComplete
                  value={selectedTags}
                  suggestions={filteredTags}
                  completeMethod={searchTag}
                  field="tagName"
                  multiple
                  onChange={(e) => setSelectedTags(e.value)}
                  onSelect={(e) => handleTagSelect(e.value)}
                  onUnselect={(e) => handleTagUnselect(e.value)}
                />
              </div>
            </div>
            {/* <div style={{ marginBottom: "15px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>Overview</span>
              <i
                className="fas fa-plus"
                style={{ fontSize: "10px", paddingLeft: "10px", cursor: "pointer" }}
                onClick={() => handleEntryEditClick(undefined)}
              ></i>
            </div> */}
            <OverviewContainer>
              {asset!.sectionEntries?.map((entry) => (
                <StyledCard>
                  <div style={{ fontWeight: "bold" }} onClick={() => handleEntryEditClick(entry)}>
                    <span style={{ marginRight: "5px" }}>{entry.section!.title}</span>
                    {/* {[...Array(entry.rating ?? 0)].map((e, i) => (
                      <i
                        className="fas fa-star"
                        style={{ color: "#FFDF00", fontSize: "12px", paddingLeft: "5px" }}
                      />
                    ))} */}
                    <span className="badge" style={getBadgeStyle(entry.rating)}>
                      {entry.rating}
                    </span>
                  </div>
                  <StyledCardBody dangerouslySetInnerHTML={{ __html: entry.body }}></StyledCardBody>

                  <br />
                </StyledCard>
              ))}
              {/* <br />
              <br />
              {asset.links && asset!.links.length > 0 && (
                <div style={{ fontWeight: "bold" }}>Links</div>
              )}
              {asset!.links?.map((link) => (
                <a
                  href={link.url}
                  target="_blank"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {link.description}
                </a>
              ))} */}
            </OverviewContainer>
          </>
        )}
      </Container>
      <br />
      {/* <CoinCalendar /> */}
    </>
  );
};

export default Coin;
