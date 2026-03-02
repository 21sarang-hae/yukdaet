document.addEventListener('DOMContentLoaded', () => {
      const API_KEY = 'AIzaSyAr2k3wecMj5YnwawGP9QrB1Bsxibr6WW0';
      const db = {
                channels: [
                  { id: 'hjh', ytId: 'UC6t0ees15Lp0gyrLrAyLeJQ', name: 'Dr. Ha Jung-hoon', description: 'Pediatrician', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HJH', specialty: 'Pediatrics', isLicensed: true },
                  { id: 'oey', ytId: 'UCo9lbsLvcgE2Ft1xXvNzELg', name: 'Dr. Oh Eun-young', description: 'Psychiatrist', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OEY', specialty: 'Psychiatry', isLicensed: true }
                          ]
      };

                              function renderChannels() {
                                        const grid = document.querySelector('.channel-grid');
                                        grid.innerHTML = '';
                                        db.channels.forEach(c => {
                                                      const card = document.createElement('div');
                                                      card.className = 'channel-card';
                                                      card.innerHTML = `<h3>${c.name}</h3><p>${c.description}</p>`;
                                                      card.onclick = () => showChannel(c);
                                                      grid.appendChild(card);
                                        });
                              }

                              async function showChannel(channel) {
                                        document.getElementById('current-channel-name').textContent = channel.name;
                                        document.getElementById('video-view').classList.remove('hidden');
                                        document.getElementById('channel-view').classList.add('hidden');
                                        const videos = await fetchVideos(channel.ytId);
                                        renderVideos(videos);
                              }

                              async function fetchVideos(ytId) {
                                        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${ytId}&part=snippet,id&order=viewCount&maxResults=10&type=video`);
                                        const data = await res.json();
                                        return data.items.map(item => ({ vidId: item.id.videoId, title: item.snippet.title, thumbnail: item.snippet.thumbnails.medium.url }));
                              }

                              function renderVideos(videos) {
                                        const list = document.getElementById('video-list');
                                        list.innerHTML = '';
                                        videos.forEach(v => {
                                                      const item = document.createElement('div');
                                                      item.className = 'video-item';
                                                      item.innerHTML = `<h4>${v.title}</h4>`;
                                                      item.onclick = () => showContent(v);
                                                      list.appendChild(item);
                                        });
                              }

                              function showContent(v) {
                                        document.getElementById('content-title').textContent = v.title;
                                        document.getElementById('video-view').classList.add('hidden');
                                        document.getElementById('content-view').classList.remove('hidden');
                                        document.getElementById('video-iframe-placeholder').innerHTML = `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${v.vidId}" frameborder="0" allowfullscreen></iframe>`;
                              }

                              document.getElementById('back-btn').onclick = () => {
                                        document.querySelectorAll('.view-section').forEach(s => s.classList.add('hidden'));
                                        document.getElementById('channel-view').classList.remove('hidden');
                              };

                              renderChannels();
});
