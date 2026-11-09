import { FormEvent, useEffect, useState } from "react";

const ASSET = "/assets";

// 화면에서 반복 사용하는 상품 데이터는 UI 코드와 분리해 수정하기 쉽게 둡니다.
type Product = {
  name: string;
  detail: string;
  price: string;
  image: string;
  category: string;
};

const games = [
  { name: "유희왕", detail: "일본판 / OCG / TCG", image: "d5cb3.png" },
  { name: "포켓몬 카드게임", detail: "스탠다드", image: "79960.png" },
  { name: "원피스 카드게임", detail: "일본판 / 영어판", image: "b2f03.png" },
  { name: "매직: 더 개더링", detail: "MTG", image: "30b7b.png" },
  { name: "디지몬 카드게임", detail: "일본판 / 글로벌", image: "b6077.png" },
  { name: "기타 TCG", detail: "다양한 게임", image: null },
];

const accessories = [
  {
    title: "드래곤 실드 프로텍터",
    detail: "슬리브 규격 · 두께 · 투명도",
    image: "a8cd8.png",
    category: "프로텍터",
  },
  {
    title: "덱 케이스",
    detail: "수납 매수 · 이중슬리브 대응",
    image: "cdcfa.png",
    category: "덱 케이스",
  },
  { title: "플레이 매트", detail: "사이즈 · 재질 · 휴대성", image: "50d91.png", category: "매트" },
  { title: "바인더", detail: "페이지 수 · 포켓 규격", image: "8f89e.png", category: "바인더" },
  {
    title: "탑로더 & 보관",
    detail: "전시 · 장기 보관 · 보호",
    image: "6e889.png",
    category: "보관",
  },
];

const products: Product[] = [
  {
    name: "슬리브 100",
    detail: "슬림핏 / 64×89mm",
    price: "5,000원",
    image: "571e2.png",
    category: "프로텍터",
  },
  {
    name: "일본판 유희왕 부스터 팩 임모탈 피닉스",
    detail: "한정 부스터 팩",
    price: "70,000원",
    image: "84403.png",
    category: "카드",
  },
  {
    name: "더블 슬리브 대응 덱 케이스",
    detail: "덱 보관",
    price: "70,000원",
    image: "8ab92.png",
    category: "덱 케이스",
  },
  {
    name: "9포켓 카드 바인더",
    detail: "사이드 로딩",
    price: "7,000원",
    image: "ce322.png",
    category: "바인더",
  },
];

const filters = ["전체", "프로텍터", "매트", "덱 케이스", "바인더"];

// 작은 SVG 아이콘은 한 컴포넌트에서 관리해 버튼의 의미를 명확하게 합니다.
function Icon({ name }: { name: "search" | "heart" | "cart" | "menu" | "close" | "arrow" }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    heart: (
      <path d="M20.8 5.7c-1.8-2-5-1.9-6.8.2-1.8-2.1-5-2.2-6.8-.2-2 2.2-1.7 5.6.3 7.7L14 20l6.5-6.6c2-2.1 2.3-5.5.3-7.7Z" />
    ),
    cart: (
      <>
        <path d="M3 4h2l2 11h10l2-7H7" />
        <circle cx="9" cy="19" r="1" />
        <circle cx="17" cy="19" r="1" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };
  return (
    <svg aria-hidden="true" className="icon" viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  );
}

function Header({ cartCount }: { cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    document.querySelector("#popular")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("store-search", { detail: query }));
  };

  return (
    <>
      <div className="service-strip">
        <div className="service-inner">
          <strong>배송부터 보관까지, 당신의 플레이를 위한 TCG 스토어</strong>
          <nav aria-label="서비스 메뉴">
            <a href="#delivery">배송조회</a>
            <a href="#store">매장안내</a>
            <a href="#support">고객센터</a>
          </nav>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Nexus TCG 홈">
            <strong>NEXUS / TCG</strong>
            <span>COLLECT · PLAY · PROTECT</span>
          </a>
          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="메뉴 열기"
          >
            <Icon name="menu" />
          </button>
          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="주 메뉴">
            <button
              className="menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="메뉴 닫기"
            >
              <Icon name="close" />
            </button>
            <a href="#games" onClick={() => setMenuOpen(false)}>
              게임별 상품
            </a>
            <a href="#accessories" onClick={() => setMenuOpen(false)}>
              보호용품
            </a>
            <a href="#accessories" onClick={() => setMenuOpen(false)}>
              플레이용품
            </a>
            <a href="#popular" onClick={() => setMenuOpen(false)}>
              이벤트
            </a>
            <a href="#support" onClick={() => setMenuOpen(false)}>
              커뮤니티
            </a>
          </nav>
          <form className="search" onSubmit={submitSearch}>
            <Icon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="상품 검색"
              placeholder="카드명, 상품명, 규격 검색"
            />
          </form>
          <a className="cart-link" href="#cart">
            <Icon name="heart" />
            <span>장바구니</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </a>
        </div>
      </header>
      {menuOpen && (
        <button
          className="menu-backdrop"
          aria-label="메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

// 점 버튼으로 원본 아트워크의 초점을 바꾸는 이미지 슬라이드입니다.
function Hero() {
  const [slide, setSlide] = useState(0);
  const slideLabels = [
    "모든 플레이어를 위한 컬렉션",
    "좋아하는 카드를 위한 보호",
    "완성도 높은 플레이 준비",
  ];

  return (
    <section className="hero" aria-roledescription="carousel" aria-label="주요 프로모션">
      <img
        key={slide}
        className={`hero-image hero-image-${slide}`}
        src={`${ASSET}/26393.png`}
        alt=""
      />
      <div className="hero-copy">
        <p className="eyebrow">FOR EVERY PLAYER</p>
        <h1>
          좋아하는 게임은 달라도,
          <br />
          소중한 카드는 모두 똑같이.
        </h1>
        <p className="hero-description">
          덱을 완성하는 싱글 카드부터 오래 쓰는 보호용품까지
          <br />
          플레이 스타일에 맞춰 편하게 찾아보세요.
        </p>
        <a className="primary-button" href="#popular">
          상품 둘러보기 <Icon name="arrow" />
        </a>
      </div>
      <div className="hero-dots" aria-label="슬라이드 선택">
        {slideLabels.map((label, index) => (
          <button
            key={label}
            className={slide === index ? "active" : ""}
            onClick={() => setSlide(index)}
            aria-label={label}
            aria-current={slide === index}
          />
        ))}
      </div>
    </section>
  );
}

// 같은 제목 구조를 여러 상품 영역에서 재사용합니다.
function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function GameSelector() {
  return (
    <section id="games" className="section-block">
      <SectionHeading
        title="어떤 게임을 즐기시나요?"
        description="게임을 선택하면 관련 카드와 규격에 맞는 용품을 먼저 보여드려요."
      />
      <div className="game-grid">
        {games.map((game) => (
          <a className="game-card" href="#popular" key={game.name}>
            {game.image ? (
              <img src={`${ASSET}/${game.image}`} alt="" />
            ) : (
              <span className="plus">＋</span>
            )}
            <span className="game-copy">
              <strong>{game.name}</strong>
              <small>{game.detail}</small>
            </span>
            <span className="card-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// 모바일에서는 앞·뒤 버튼으로 카드 트랙을 한 칸씩 움직입니다.
function AccessoryShowcase({
  onSelect,
}: {
  onSelect: (item: (typeof accessories)[number]) => void;
}) {
  const [offset, setOffset] = useState(0);
  return (
    <section id="accessories" className="section-block">
      <div className="heading-with-controls">
        <SectionHeading
          title="플레이를 더 편하고 한눈에"
          description="게임과 카드 규격에 맞는 용품을 쉽게 비교하고 선택하세요."
        />
        <div className="slider-controls">
          <button
            onClick={() => setOffset(Math.max(0, offset - 1))}
            disabled={offset === 0}
            aria-label="이전 용품"
          >
            ←
          </button>
          <button
            onClick={() => setOffset(Math.min(accessories.length - 1, offset + 1))}
            disabled={offset === accessories.length - 1}
            aria-label="다음 용품"
          >
            →
          </button>
        </div>
      </div>
      <div className="accessory-viewport">
        <div className="accessory-grid" style={{ "--mobile-slide": offset } as React.CSSProperties}>
          {accessories.map((item) => (
            <button className="accessory-card" onClick={() => onSelect(item)} key={item.title}>
              <span className="accessory-image">
                <img src={`${ASSET}/${item.image}`} alt={item.title} />
              </span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// 검색과 카테고리 필터를 함께 적용해 보이는 상품 목록을 계산합니다.
function ProductGrid({ onSelect }: { onSelect: (product: Product) => void }) {
  const [filter, setFilter] = useState("전체");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const onSearch = (event: Event) => setSearch((event as CustomEvent<string>).detail.trim());
    window.addEventListener("store-search", onSearch);
    return () => window.removeEventListener("store-search", onSearch);
  }, []);

  const visibleProducts = products.filter((product) => {
    const matchesFilter = filter === "전체" || product.category === filter;
    const matchesSearch =
      !search || `${product.name} ${product.detail}`.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="popular" className="section-block popular-section">
      <h2>지금 많이 찾는 상품</h2>
      <div className="filters" aria-label="상품 필터">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => {
              setFilter(item);
              setSearch("");
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {visibleProducts.length ? (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <button className="product-card" key={product.name} onClick={() => onSelect(product)}>
              <img src={`${ASSET}/${product.image}`} alt={product.name} />
              <span>
                <strong>{product.name}</strong>
                <small>{product.detail}</small>
                <b>{product.price}</b>
              </span>
            </button>
          ))}
        </div>
      ) : (
        <p className="empty-result">
          “{search || filter}”에 해당하는 상품이 없습니다. 다른 검색어를 입력해 주세요.
        </p>
      )}
    </section>
  );
}

type ModalItem = Product | (typeof accessories)[number];

// 카드 선택 시 열리는 공통 팝업이며, 배경 또는 Esc 키로 닫을 수 있습니다.
function ProductModal({
  item,
  onClose,
  onAdd,
}: {
  item: ModalItem;
  onClose: () => void;
  onAdd: () => void;
}) {
  const title = "name" in item ? item.name : item.title;
  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [onClose]);

  return (
    <div
      className="modal-layer"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 상세 정보`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="팝업 닫기">
          <Icon name="close" />
        </button>
        <img src={`${ASSET}/${item.image}`} alt={title} />
        <div className="modal-copy">
          <p className="eyebrow">NEXUS SELECT</p>
          <h2>{title}</h2>
          <p>{item.detail}</p>
          {"price" in item && <strong className="modal-price">{item.price}</strong>}
          <button className="modal-add" onClick={onAdd}>
            <Icon name="cart" /> 장바구니에 담기
          </button>
        </div>
      </div>
    </div>
  );
}

// 최상위 컴포넌트에서 팝업 선택 상태와 장바구니 수량을 공유합니다.
export default function App() {
  const [selected, setSelected] = useState<ModalItem | null>(null);
  const [cartCount, setCartCount] = useState(0);

  return (
    <div id="top" className="site-shell">
      <Header cartCount={cartCount} />
      <main className="content">
        <Hero />
        <GameSelector />
        <AccessoryShowcase onSelect={setSelected} />
        <ProductGrid onSelect={setSelected} />
      </main>
      <footer id="support">
        <strong>NEXUS / TCG</strong>
        <span id="delivery">배송조회</span>
        <span id="store">매장안내</span>
        <span>고객센터</span>
      </footer>
      {selected && (
        <ProductModal
          item={selected}
          onClose={() => setSelected(null)}
          onAdd={() => {
            setCartCount((count) => count + 1);
            setSelected(null);
          }}
        />
      )}
      <div id="cart" className="cart-anchor" aria-live="polite">
        {cartCount ? `장바구니에 ${cartCount}개 상품이 담겼습니다.` : ""}
      </div>
    </div>
  );
}
