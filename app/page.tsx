
import Link from "next/link";

const COMPANY = "후드의정석";

const SERVICES = [
  {
    title: "주방후드 교체",
    description:
      "노후 주방후드 철거부터 새 제품 설치까지 진행합니다.",
    slug: "kitchen-hood",
  },
  {
    title: "가정용후드 교체",
    description:
      "아파트, 빌라, 단독주택의 주방후드 교체 시공.",
    slug: "home-hood",
  },
  {
    title: "아일랜드후드 교체",
    description:
      "천장형 아일랜드후드 철거 및 교체 설치.",
    slug: "island-hood",
  },
  {
    title: "침니후드 교체",
    description:
      "벽부형 침니후드 교체 및 설치 상담.",
    slug: "chimney-hood",
  },
  {
    title: "허리케인후드 교체",
    description:
      "허리케인형 후드 교체와 설치 환경 확인.",
    slug: "hurricane-hood",
  },
  {
    title: "후황 교체",
    description:
      "기존 후황 철거와 새로운 환기후드 설치.",
    slug: "exhaust-hood",
  },
];

const PROCESS = [
  "현장 사진 및 설치 환경 확인",
  "기존 후드 규격과 배기 방식 확인",
  "제품 및 시공 방법 안내",
  "기존 후드 철거 및 새 후드 설치",
  "작동 및 배기 상태 점검",
];

export default function Home() {
  return (
    <main>
      <header className="header">
        <Link href="/" className="logo">
          후드<span>의정석</span>
        </Link>
        <nav>
          <a href="#services">시공 서비스</a>
          <a href="#process">시공 절차</a>
          <a href="#contact">상담 안내</a>
        </nav>
      </header>

      <section className="hero">
        <div className="heroContent">
          <p className="eyebrow">
            KITCHEN HOOD SPECIALIST
          </p>
          <h1>
            주방후드 교체,
            <br />
            <span>후드의정석</span>
          </h1>
          <p className="heroDescription">
            오래된 주방후드부터 아일랜드후드까지
            <br />
            전국 주방후드 교체·설치 상담
          </p>
          <div className="heroButtons">
            <a href="#services" className="primaryButton">
              시공 서비스 보기
            </a>
            <a href="#contact" className="outlineButton">
              견적 상담 안내
            </a>
          </div>
        </div>
      </section>

      <section className="intro section">
        <p className="sectionLabel">ABOUT US</p>
        <h2>주방후드 교체의 기준</h2>
        <p>
          후드의정석은 기존 후드의 크기, 설치 공간,
          배기 방식 등을 확인하고 현장 조건에 맞는
          교체 및 설치 방법을 안내합니다.
        </p>
      </section>

      <section id="services" className="section services">
        <p className="sectionLabel">OUR SERVICES</p>
        <h2>후드 교체·설치 서비스</h2>
        <p className="sectionDescription">
          다양한 주방 환경에 맞는 후드 교체 시공
        </p>

        <div className="serviceGrid">
          {SERVICES.map((service, index) => (
            <article className="serviceCard" key={service.slug}>
              <div className="serviceNumber">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <a href="#contact">상담 안내 →</a>
            </article>
          ))}
        </div>
      </section>

      <section className="banner">
        <p>전국 주방후드 교체·설치</p>
        <h2>
          주방 환경에 맞는
          <br />
          후드 시공을 안내합니다.
        </h2>
      </section>

      <section id="process" className="section process">
        <p className="sectionLabel">WORK PROCESS</p>
        <h2>후드 교체 진행 절차</h2>

        <div className="processList">
          {PROCESS.map((item, index) => (
            <div className="processItem" key={item}>
              <strong>
                {String(index + 1).padStart(2, "0")}
              </strong>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq">
        <p className="sectionLabel">FAQ</p>
        <h2>자주 묻는 질문</h2>

        <div className="faqItem">
          <h3>Q. 기존 후드와 다른 브랜드로 교체할 수 있나요?</h3>
          <p>
            설치 공간과 배기구 위치, 제품 규격이
            적합한 경우 가능합니다.
          </p>
        </div>

        <div className="faqItem">
          <h3>Q. 아일랜드후드도 교체 가능한가요?</h3>
          <p>
            천장 고정 구조와 배기 연결 상태를
            확인한 후 시공 가능 여부를 안내합니다.
          </p>
        </div>

        <div className="faqItem">
          <h3>Q. 전국 어디서나 시공 가능한가요?</h3>
          <p>
            전국 지역별 상담을 진행하며,
            실제 방문 가능 여부는 지역과 일정에 따라
            확인이 필요합니다.
          </p>
        </div>

        <div className="faqItem">
          <h3>Q. 견적을 받으려면 무엇이 필요한가요?</h3>
          <p>
            기존 후드의 정면 사진, 제품 모델명,
            설치 공간의 가로 폭을 알려주시면
            상담에 도움이 됩니다.
          </p>
        </div>
      </section>

      <section id="contact" className="contact">
        <p className="sectionLabel">CONTACT US</p>
        <h2>후드 교체 상담</h2>
        <p>
          기존 후드 사진과 설치 지역을 준비해 주세요.
          <br />
          대표 전화번호 등록 후 전화 상담이 연결됩니다.
        </p>
        <div className="contactPending">
          상담 전화번호 등록 예정
        </div>
      </section>

      <footer className="footer">
        <strong>{COMPANY}</strong>
        <p>전국 주방후드 교체·설치 전문</p>
        <p>홈페이지: hoodmaster.kr</p>
        <small>
          © {new Date().getFullYear()} 후드의정석.
          All rights reserved.
        </small>
      </footer>
    </main>
  );
}
