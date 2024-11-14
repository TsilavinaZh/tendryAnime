import React, { useState } from 'react';
import { Card, Col, Row, Modal, Typography, Button } from 'antd';

const { Meta } = Card;
const { Paragraph, Title } = Typography;

const AnimeList = ({ animes }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  // Fonction pour sélectionner un anime aléatoire
  const getRandomAnime = () => {
    const randomIndex = Math.floor(Math.random() * animes.length);
    return animes[randomIndex];
  };

  // Fonction pour ouvrir le modal avec un anime aléatoire
  const showModal = () => {
    const randomAnime = getRandomAnime();
    setSelectedAnime(randomAnime);
    setIsModalVisible(true);
  };

  // Fonction pour fermer le modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAnime(null);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {animes.map((anime) => (
          <Col xs={24} sm={12} md={8} lg={6} key={anime.mal_id}>
            <Card
              hoverable
              className="anime-card"
              cover={
                <img
                  alt={anime.title}
                  src={anime.images.jpg.large_image_url}
                  className="anime-image"
                />
              }
              onClick={showModal}
            >
              <Meta title={anime.title} description={`Score: ${anime.score}`} />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Popup Modal */}
      {selectedAnime && (
        <Modal
          title={selectedAnime.title}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={500} // Taille réduite du modal
        >
          <img
            src={selectedAnime.images.jpg.large_image_url}
            alt={selectedAnime.title}
            style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
          />
          <Title level={4}>Synopsis</Title>
          <Paragraph>{selectedAnime.synopsis || 'Synopsis non disponible.'}</Paragraph>
          <Title level={5}>Score: {selectedAnime.score}</Title>
          <Title level={5}>Episodes: {selectedAnime.episodes}</Title>
          <Title level={5}>Type: {selectedAnime.type}</Title>
        </Modal>
      )}
    </>
  );
};

export default AnimeList;
