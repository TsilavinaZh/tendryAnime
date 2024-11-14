import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Layout, Typography, Space, Spin, Card, Col, Row, Modal, Button } from 'antd';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const App = () => {
  const [query, setQuery] = useState('');
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  // Fonction de recherche des animes
  const searchAnime = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=12`);
      setAnimes(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    } finally {
      setLoading(false);
    }
  };

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

  // Charger les animes au démarrage de l'application
  useEffect(() => {
    searchAnime('Naruto'); // Charger quelques animes par défaut
  }, []);

  return (
    <Layout className="layout">
      <Header>
        <Title style={{ color: '#fff', textAlign: 'center', margin: 0 }}>Tendry Anime</Title>
      </Header>
      <Content style={{ padding: '20px 50px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Input.Search
            placeholder="Rechercher un anime"
            enterButton="Chercher"
            size="large"
            onSearch={searchAnime}
          />
          {loading ? (
            <div className="loading-spinner">
              <Spin size="large" />
            </div>
          ) : (
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
          )}
        </Space>
      </Content>

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
    </Layout>
  );
};

export default App;
