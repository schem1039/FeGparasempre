document.addEventListener('DOMContentLoaded', () => {
    const entranceDoor = document.getElementById('entranceDoor');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginMessage = document.getElementById('loginMessage');
    const facadeContainer = document.querySelector('.facade-container');
    const romanticPageContainer = document.querySelector('.romantic-page-container');
    const facadeAudio = document.getElementById('facadeBackgroundAudio');

    // Credenciais (para fins de demonstração)
    const correctUsername = 'FeG';
    const correctPassword = 'Parasempre';

    // Inicializar áudio de fundo da fachada
    initializeFacadeAudio();

    // Abrir modal ao clicar na porta
    entranceDoor.addEventListener('click', () => {
        loginModal.classList.add('active');
        usernameInput.focus();
    });

    // Fechar modal
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
        clearForm();
    });

    // Fechar modal ao clicar fora dele
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            clearForm();
        }
    });

    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            clearForm();
        }
    });

    // Processar login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value;

        if (enteredUsername === correctUsername && enteredPassword === correctPassword) {
            // Credenciais corretas
            hideErrorMessage();
            loginModal.classList.remove('active');
            
            // Inicia a transição
            setTimeout(() => {
                facadeContainer.classList.add('hidden');
                romanticPageContainer.classList.add('visible');
                loadRomanticPageContent();
            }, 300);

        } else {
            // Credenciais incorretas
            showErrorMessage('Credenciais incorretas');
            
            // Adiciona animação de vibração
            loginForm.classList.add('shake');
            setTimeout(() => {
                loginForm.classList.remove('shake');
            }, 500);
        }
    });

    function initializeFacadeAudio() {
        if (facadeAudio) {
            // Configurar volume para 15%
            facadeAudio.volume = 0.15;
            
            // Adicionar controles de áudio discretos na fachada
            addFacadeAudioControls();
            
            // Tentar reproduzir automaticamente (respeitando políticas do navegador)
            playFacadeAudio();
        }
    }

    function addFacadeAudioControls() {
        const audioControls = document.createElement('div');
        audioControls.className = 'facade-audio-controls';
        audioControls.innerHTML = `
            <button class="facade-audio-toggle" id="facadeAudioToggle" title="Pausar/Reproduzir música">
                <span class="facade-audio-icon">🎵</span>
            </button>
        `;
        
        facadeContainer.appendChild(audioControls);
        
        // Event listener para o botão de toggle
        const facadeAudioToggle = document.getElementById('facadeAudioToggle');
        facadeAudioToggle.addEventListener('click', toggleFacadeAudio);
    }

    function playFacadeAudio() {
        if (facadeAudio && facadeAudio.src) {
            const playPromise = facadeAudio.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        updateFacadeAudioIcon(true);
                    })
                    .catch(error => {
                        console.log('Autoplay bloqueado na fachada:', error);
                        showFacadeAudioPrompt();
                    });
            }
        }
    }

    function toggleFacadeAudio() {
        if (!facadeAudio || !facadeAudio.src) return;
        
        if (facadeAudio.paused) {
            facadeAudio.play()
                .then(() => updateFacadeAudioIcon(true))
                .catch(error => console.log('Erro ao reproduzir áudio da fachada:', error));
        } else {
            facadeAudio.pause();
            updateFacadeAudioIcon(false);
        }
    }

    function updateFacadeAudioIcon(isPlaying) {
        const audioIcon = document.querySelector('.facade-audio-icon');
        if (audioIcon) {
            audioIcon.textContent = isPlaying ? '🎵' : '🔇';
        }
        
        const audioToggle = document.getElementById('facadeAudioToggle');
        if (audioToggle) {
            audioToggle.title = isPlaying ? 'Pausar música' : 'Reproduzir música';
        }
    }

    function showFacadeAudioPrompt() {
        const audioPrompt = document.createElement('div');
        audioPrompt.className = 'facade-audio-prompt';
        audioPrompt.innerHTML = `
            <div class="facade-audio-prompt-content">
                <p>🎵 Clique para ativar a música romântica</p>
                <button class="elegant-btn" onclick="activateFacadeAudio()">Ativar Música</button>
            </div>
        `;
        
        facadeContainer.appendChild(audioPrompt);
    }

    window.activateFacadeAudio = function() {
        if (facadeAudio && facadeAudio.src) {
            facadeAudio.play()
                .then(() => {
                    updateFacadeAudioIcon(true);
                    const prompt = document.querySelector('.facade-audio-prompt');
                    if (prompt) {
                        prompt.remove();
                    }
                })
                .catch(error => console.log('Erro ao ativar áudio da fachada:', error));
        }
    };

    // Função para permitir que o usuário substitua o áudio da fachada
    window.updateFacadeAudio = function(audioUrl) {
        if (facadeAudio && audioUrl) {
            facadeAudio.src = audioUrl;
            facadeAudio.load();
            
            // Tentar reproduzir automaticamente
            playFacadeAudio();
        }
    };

    function clearForm() {
        usernameInput.value = '';
        passwordInput.value = '';
        hideErrorMessage();
    }

    function showErrorMessage(message) {
        loginMessage.textContent = message;
        loginMessage.classList.add('show');
    }

    function hideErrorMessage() {
        loginMessage.classList.remove('show');
    }

    function loadRomanticPageContent() {
        // Conteúdo completo da Página Romântica
        romanticPageContainer.innerHTML = `
            <div class="romantic-content">
                <!-- Elementos florais decorativos -->
                <div class="floral-decoration top-left"></div>
                <div class="floral-decoration bottom-right"></div>
                
                <!-- Cabeçalho com nomes do casal -->
                <header class="couple-header">
                    <h1 class="couple-names">Fabio & Gizele</h1>
                    <p class="couple-subtitle">Nosso Convite Especial</p>
                </header>

                <!-- Seção principal com três blocos -->
                <main class="main-content">
                    <div class="content-grid">
                        <!-- Bloco 1: QR Code -->
                        <div class="content-block qr-block">
                            <div class="block-content">
                                <img src="images/qr_placeholder.png" alt="QR Code para RSVP" class="qr-image">
                                <h3>Acesso Rápido</h3>
                                <p>Escaneie para acessar RSVP / mapas / surpresa</p>
                            </div>
                        </div>

                        <!-- Bloco 2: PDF do Convite -->
                        <div class="content-block invite-block">
                            <div class="block-content">
                                <img src="images/convite_thumbnail.png" alt="Thumbnail do convite" class="invite-thumbnail">
                                <h3>Nosso Convite</h3>
                                <button class="elegant-btn" onclick="openInvitePDF()">Abrir Convite (PDF)</button>
                                <button class="elegant-btn secondary" onclick="downloadInvitePDF()">Download</button>
                            </div>
                        </div>

                        <!-- Bloco 3: Vídeo do Casal -->
                        <div class="content-block video-block">
                            <div class="block-content">
                                <div class="video-placeholder">
                                    <div class="video-icon">▶</div>
                                    <p>Vídeo será adicionado em breve</p>
                                </div>
                                <h3>Nossa História</h3>
                                <p>Um vídeo especial do casal</p>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Botão para voltar à fachada -->
                <div class="back-to-facade">
                    <button class="back-btn" onclick="backToFacade()">← Voltar à Entrada</button>
                </div>

                <!-- Elemento de áudio (será implementado na próxima fase) -->
                <audio id="backgroundAudio" preload="auto" loop>
                    <!-- Fonte do áudio será adicionada -->
                </audio>
            </div>
        `;
    }

    // Funções auxiliares para a página romântica
    window.openInvitePDF = function() {
        // Placeholder - será implementado com URL real do PDF
        alert('PDF do convite será aberto aqui');
    };

    window.downloadInvitePDF = function() {
        // Placeholder - será implementado com download real
        alert('Download do convite será iniciado aqui');
    };

    window.backToFacade = function() {
        romanticPageContainer.classList.remove('visible');
        facadeContainer.classList.remove('hidden');
        
        // Limpa os campos do formulário
        clearForm();
    };
});



// Funcionalidades interativas e de acessibilidade
function initializeRomanticPageFeatures() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('.qr-image, .invite-thumbnail');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Animação escalonada dos blocos de conteúdo
    const contentBlocks = document.querySelectorAll('.content-block');
    contentBlocks.forEach((block, index) => {
        block.style.opacity = '0';
        block.style.transform = 'translateY(30px)';
        block.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
    
    // Animação do cabeçalho
    const header = document.querySelector('.couple-header');
    if (header) {
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';
        header.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Adicionar funcionalidade de teclado para acessibilidade
    document.addEventListener('keydown', (e) => {
        if (romanticPageContainer.classList.contains('visible')) {
            if (e.key === 'Escape') {
                backToFacade();
            }
        }
    });
    
    // Melhorar foco para acessibilidade
    const focusableElements = document.querySelectorAll('.elegant-btn, .back-btn');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #8b7355';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Atualizar a função loadRomanticPageContent para incluir as novas funcionalidades
const originalLoadRomanticPageContent = loadRomanticPageContent;
loadRomanticPageContent = function() {
    originalLoadRomanticPageContent();
    
    // Aguardar o DOM ser atualizado antes de inicializar as funcionalidades
    setTimeout(() => {
        initializeRomanticPageFeatures();
    }, 100);
};

// Funcionalidades para substituir placeholders por URLs reais
window.updateQRCode = function(imageUrl) {
    const qrImage = document.querySelector('.qr-image');
    if (qrImage && imageUrl) {
        qrImage.src = imageUrl;
        qrImage.alt = 'QR Code para acesso rápido ao RSVP, mapas e surpresas';
    }
};

window.updateInvitePDF = function(pdfUrl, thumbnailUrl) {
    if (thumbnailUrl) {
        const thumbnail = document.querySelector('.invite-thumbnail');
        if (thumbnail) {
            thumbnail.src = thumbnailUrl;
            thumbnail.alt = 'Visualização do convite de casamento de Fabio e Gizele';
        }
    }
    
    if (pdfUrl) {
        window.openInvitePDF = function() {
            window.open(pdfUrl, '_blank');
        };
        
        window.downloadInvitePDF = function() {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Convite_Fabio_Gizele.pdf';
            link.click();
        };
    }
};

window.updateVideo = function(videoUrl, posterUrl) {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder && videoUrl) {
        const videoElement = document.createElement('video');
        videoElement.src = videoUrl;
        videoElement.controls = true;
        videoElement.preload = 'metadata';
        videoElement.style.width = '150px';
        videoElement.style.height = '150px';
        videoElement.style.borderRadius = '15px';
        videoElement.style.objectFit = 'cover';
        
        if (posterUrl) {
            videoElement.poster = posterUrl;
        }
        
        videoElement.setAttribute('aria-label', 'Vídeo especial do casal Fabio e Gizele');
        
        videoPlaceholder.parentNode.replaceChild(videoElement, videoPlaceholder);
    }
};

// Função para adicionar efeitos de parallax suave nos elementos florais
function initializeParallaxEffects() {
    const floralElements = document.querySelectorAll('.floral-decoration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floralElements.forEach((element, index) => {
            const direction = index % 2 === 0 ? 1 : -1;
            element.style.transform = `translateY(${rate * direction}px) rotate(${index % 2 === 0 ? '0deg' : '180deg'})`;
        });
    });
}

// Inicializar efeitos de parallax quando a página romântica for carregada
const originalBackToFacade = window.backToFacade;
window.backToFacade = function() {
    // Remover event listeners para evitar vazamentos de memória
    window.removeEventListener('scroll', initializeParallaxEffects);
    
    originalBackToFacade();
};


// Funcionalidade de áudio de fundo
let backgroundAudio = null;
let audioInitialized = false;

function initializeBackgroundAudio() {
    if (audioInitialized) return;
    
    backgroundAudio = document.getElementById('backgroundAudio');
    if (backgroundAudio) {
        // Configurar volume para 15%
        backgroundAudio.volume = 0.15;
        
        // Adicionar controle de áudio discreto
        addAudioControls();
        
        // Tentar reproduzir o áudio (respeitando políticas do navegador)
        playBackgroundAudio();
        
        audioInitialized = true;
    }
}

function addAudioControls() {
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button class="audio-toggle" id="audioToggle" title="Pausar/Reproduzir música">
            <span class="audio-icon">🎵</span>
        </button>
        <div class="audio-info">
            <span>Música de fundo</span>
        </div>
    `;
    
    document.querySelector('.romantic-content').appendChild(audioControls);
    
    // Event listener para o botão de toggle
    const audioToggle = document.getElementById('audioToggle');
    audioToggle.addEventListener('click', toggleBackgroundAudio);
}

function playBackgroundAudio() {
    if (backgroundAudio) {
        // Usar uma promessa para lidar com a política de autoplay
        const playPromise = backgroundAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Áudio iniciado com sucesso
                    updateAudioToggleIcon(true);
                })
                .catch(error => {
                    // Autoplay foi bloqueado, mostrar indicação para o usuário
                    console.log('Autoplay bloqueado:', error);
                    showAudioPrompt();
                });
        }
    }
}

function toggleBackgroundAudio() {
    if (!backgroundAudio) return;
    
    if (backgroundAudio.paused) {
        backgroundAudio.play()
            .then(() => updateAudioToggleIcon(true))
            .catch(error => console.log('Erro ao reproduzir áudio:', error));
    } else {
        backgroundAudio.pause();
        updateAudioToggleIcon(false);
    }
}

function updateAudioToggleIcon(isPlaying) {
    const audioIcon = document.querySelector('.audio-icon');
    if (audioIcon) {
        audioIcon.textContent = isPlaying ? '🎵' : '🔇';
    }
    
    const audioToggle = document.getElementById('audioToggle');
    if (audioToggle) {
        audioToggle.title = isPlaying ? 'Pausar música' : 'Reproduzir música';
    }
}

function showAudioPrompt() {
    const audioPrompt = document.createElement('div');
    audioPrompt.className = 'audio-prompt';
    audioPrompt.innerHTML = `
        <div class="audio-prompt-content">
            <p>🎵 Clique para ativar a música de fundo</p>
            <button class="elegant-btn" onclick="activateAudio()">Ativar Música</button>
        </div>
    `;
    
    document.querySelector('.romantic-content').appendChild(audioPrompt);
}

window.activateAudio = function() {
    if (backgroundAudio) {
        backgroundAudio.play()
            .then(() => {
                updateAudioToggleIcon(true);
                const prompt = document.querySelector('.audio-prompt');
                if (prompt) {
                    prompt.remove();
                }
            })
            .catch(error => console.log('Erro ao ativar áudio:', error));
    }
};

// Função para permitir que o usuário substitua o áudio
window.updateBackgroundAudio = function(audioUrl) {
    if (backgroundAudio && audioUrl) {
        backgroundAudio.src = audioUrl;
        backgroundAudio.load(); // Recarregar o áudio com a nova fonte
        
        // Tentar reproduzir automaticamente se o áudio estava tocando
        if (!backgroundAudio.paused) {
            backgroundAudio.play()
                .then(() => updateAudioToggleIcon(true))
                .catch(error => console.log('Erro ao reproduzir novo áudio:', error));
        }
    }
};

// Atualizar a função de carregamento da página romântica
const originalLoadRomanticPageContentWithAudio = loadRomanticPageContent;
loadRomanticPageContent = function() {
    originalLoadRomanticPageContentWithAudio();
    
    // Aguardar o DOM ser atualizado antes de inicializar o áudio
    setTimeout(() => {
        initializeRomanticPageFeatures();
        initializeBackgroundAudio();
        initializeParallaxEffects();
    }, 100);
};

// Pausar áudio ao voltar para a fachada
const originalBackToFacadeWithAudio = window.backToFacade;
window.backToFacade = function() {
    if (backgroundAudio && !backgroundAudio.paused) {
        backgroundAudio.pause();
    }
    
    // Remover controles de áudio
    const audioControls = document.querySelector('.audio-controls');
    if (audioControls) {
        audioControls.remove();
    }
    
    const audioPrompt = document.querySelector('.audio-prompt');
    if (audioPrompt) {
        audioPrompt.remove();
    }
    
    audioInitialized = false;
    
    originalBackToFacadeWithAudio();
};

