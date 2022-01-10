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

const Container = styled.div`
  margin: 10px;
  font-size: 14px;

  .badge {
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    padding: 0;
    background: #c298d8;
    color: #151515;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
  }

  .link {
    color: white;
    text-decoration: none;
  }
`;

const OverviewContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0px 100px;

  p {
    margin: 0px;
  }
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
            <h3>
              <img src={`/images/assets/${asset.ticker}.png`} style={{ width: "25px" }} />
              {asset!.assetName} ({asset!.ticker})
            </h3>
            <b>Website:</b>&nbsp;
            <a href={asset!.website} className="link">
              {asset!.website}
            </a>
            <br />
            <b>Subreddit:</b>&nbsp;
            <a href={`https://reddit.com/${asset!.subreddit}`} className="link">
              {asset!.subreddit}
            </a>
            <br />
            <br />
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
            <br />
            <br />
            <div style={{ marginBottom: "15px" }}>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>Overview</span>
              <i
                className="fas fa-plus"
                style={{ fontSize: "10px", paddingLeft: "10px", cursor: "pointer" }}
                onClick={() => handleEntryEditClick(undefined)}
              ></i>
            </div>
            <OverviewContainer>
              {asset!.sectionEntries?.map((entry) => (
                <div>
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
                  <div dangerouslySetInnerHTML={{ __html: entry.body }}></div>
                  <br />
                </div>
              ))}
              <br />
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
              ))}
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
