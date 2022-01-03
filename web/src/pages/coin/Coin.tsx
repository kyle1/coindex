import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SectionEdit from "./SectionEdit";
import Modal from "../../components/Modal";
import { apiBaseUrl } from "../../constants";
import { Asset } from "../../models/Asset";
import { AssetSection } from "../../models/AssetSection";
import { AssetTag } from "../../models/AssetTag";

const Container = styled.div`
  margin: 10px;

  .link {
    color: white;
    text-decoration: none;
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

  const [selectedSection, setSelectedSection] = useState<AssetSection>();
  const [showSectionEdit, setShowSectionEdit] = useState<boolean>(false);

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

  const handleSectionEditClick = (section?: AssetSection) => {
    setSelectedSection(section);
    setShowSectionEdit(true);
  };

  const handleSectionSave = () => {
    setShowSectionEdit(false);
    getAsset(+id!);
  };

  useEffect(() => {
    getTags();
    getAsset(+id!);
  }, []);

  return (
    <>
      {showSectionEdit && (
        <Modal onConfirm={() => {}} onClose={() => setShowSectionEdit(false)}>
          <SectionEdit
            assetId={+id!}
            section={selectedSection!}
            onSave={handleSectionSave}
            onCancel={() => setShowSectionEdit(false)}
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
                onClick={() => handleSectionEditClick(undefined)}
              ></i>
            </div>
            {asset!.sections?.map((section) => (
              <>
                <div style={{ fontWeight: "bold" }}>
                  {section.sectionCategory!.title}
                  <i
                    className="fas fa-pencil-alt"
                    style={{ fontSize: "10px", paddingLeft: "10px", cursor: "pointer" }}
                    onClick={() => handleSectionEditClick(section)}
                  ></i>
                </div>
                <div>{section.body}</div>
                <br />
              </>
            ))}
            <br />
            <br />
            {asset.links && asset!.links.length > 0 && (
              <div style={{ fontWeight: "bold" }}>Links</div>
            )}
            {asset!.links?.map((link) => (
              <a href={link.url} target="_blank" style={{ textDecoration: "none", color: "white" }}>
                {link.description}
              </a>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Coin;
