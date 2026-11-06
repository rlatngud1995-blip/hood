
import Link from "next/link";

const COMPANY = "후드의정석";

const SERVICES = [
  {
    number: "01",
    title: "주방후드 교체",
    description:
      "가정용 주방후드부터 렌지후드, 레인지후드, 슬림후드, 통후드, 빌트인후드, 허리케인후드까지 기존 제품의 규격과 배기 구조를 확인하여 교체·설치를 안내합니다.",
    keywords: [
      "주방후드교체",
      "렌지후드교체",
      "레인지후드교체",
      "가정용후드교체",
      "슬림후드교체",
      "통후드교체",
      "빌트인후드교체",
      "허리케인후드교체",
      "후황교체",
    ],
  },
  {
    number: "02",
    title: "아일랜드 후드교체",
    description:
      "아일랜드 식탁과 조리대 상부에 설치된 천장형후드, 독립형후드, 아일랜드 렌지후드의 철거 및 교체를 안내합니다.",
    keywords: [
      "아일랜드후드교체",
      "아일랜드후드설치",
      "천장형후드교체",
      "천장후드설치",
      "독립형후드교체",
      "아일랜드렌지후드",
    ],
  },
  {
    number: "03",
    title: "침니 후드교체",
    description:
      "벽면에 설치된 침니후드, 굴뚝형후드, 벽부형후드, 경사형후드, 데코후드의 규격과 설치 환경을 확인하여 교체를 안내합니다.",
    keywords: [
      "침니후드교체",
      "침니후드설치",
      "벽부형후드교체",
      "굴뚝형후드교체",
      "경사형후드교체",
      "데코후드교체",
    ],
  },
];

const PROCESS = [
  "기존 주방후드 사진 및 설치 지역 확인",
  "후드 크기와 배기구 연결 구조 확인",
  "교체 제품 및 시공 방법 상담",
  "기존 후드 철거와 새 후드 설치",
  "작동 및 배기 상태 확인",
];

const FAQ = [
  {
    question: "주방후드는 어떤 종류를 교체할 수 있나요?",
    answer:
      "일반 주방후드, 렌지후드, 슬림후드, 통후드, 빌트인후드, 허리케인후드 등 다양한 가정용 후드의 교체를 상담합니다. 제품과 현장 조건에 따라 시공 가능 여부가 달라집니다.",
  },
  {
    question: "아일랜드 후드도 교체할 수 있나요?",
    answer:
      "천장형 아일랜드후드와 독립형후드는 천장 고정 구조, 배기구 위치, 제품 크기를 확인한 후 교체 가능 여부를 안내합니다.",
  },
  {
    question: "침니후드를 다른 제품으로 교체할 수 있나요?",
    answer:
      "벽부형 침니후드, 굴뚝형후드, 경사형후드 등은 설치 공간과 배기 연결 방식이 적합하면 다른 제품으로 교체할 수 있습니다.",
  },
  {
    question: "후드가 오래되고 소음이 심해도 교체 가능한가요?",
    answer:
      "노후 후드, 소음이 심한 후드, 흡입력이 약해진 후드 등은 제품 상태와 설치 환경을 확인한 후 교체를 상담할 수 있습니다.",
  },
  {
    question: "전국 후드 교체 상담이 가능한가요?",
    answer:
      "전국 지역별 주방후드 교체 상담을 안내하며 실제 방문 시공 가능 여부는 지역과 일정에 따라 확인합니다.",
  },
  {
    question: "후드 교체 견적에는 어떤 정보가 필요한가요?",
    answer:
      "현재 설치된 후드의 정면 사진, 제품 모델명, 후드 가로 크기, 설치 지역을 알려주시면 상담에 도움이 됩니다.",
  },
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
            주방후드 · 아일랜드후드 · 침니후드
            <br />
            전국 주방후드 교체·설치 상담
          </p>

          <div className="heroButtons">
            <a
              href="#services"
              className="primaryButton"
            >
              시공 서비스 보기
            </a>

            <a
              href="#contact"
              className="outlineButton"
            >
              견적 상담 안내
            </a>
          </div>
        </div>
      </section>

      <section className="intro section">
        <p className="sectionLabel">ABOUT US</p>

        <h2>주방후드 교체의 기준</h2>

        <p>
          후드의정석은 주방후드 교체 및 설치를
          안내하는 전문 서비스입니다.
          기존 후드의 크기, 설치 공간,
          배기구 연결 방식과 현장 조건을 확인하여
          적합한 교체 방법을 안내합니다.
        </p>
      </section>

      <section
        id="services"
        className="section services"
      >
        <p className="sectionLabel">
          OUR SERVICES
        </p>

        <h2>후드 교체·설치 서비스</h2>

        <p className="sectionDescription">
          주방 환경에 맞는 3가지 주요 후드 교체 서비스
        </p>

        <div className="serviceGrid">
          {SERVICES.map((service) => (
            <article
              className="serviceCard"
              key={service.number}
            >
              <div className="serviceNumber">
                {service.number}
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="keywordTags">
                {service.keywords.map((keyword) => (
                  <span
                    className="keywordTag"
                    key={keyword}
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <a href="#contact">
                견적 상담 안내 →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="banner">
        <p>전국 주방후드 교체·설치</p>

        <h2>
          오래된 주방후드부터
          <br />
          아일랜드·침니후드까지
        </h2>

        <p>
          설치 환경에 맞는 후드 교체를 안내합니다.
        </p>
      </section>

      <section
        id="process"
        className="section process"
      >
        <p className="sectionLabel">
          WORK PROCESS
        </p>

        <h2>후드 교체 진행 절차</h2>

        <div className="processList">
          {PROCESS.map((item, index) => (
            <div
              className="processItem"
              key={item}
            >
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

        {FAQ.map((item) => (
          <div
            className="faqItem"
            key={item.question}
          >
            <h3>Q. {item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </section>

      <section
        id="contact"
        className="contact"
      >
        <p className="sectionLabel">
          CONTACT US
        </p>

        <h2>주방후드 교체 상담</h2>

        <p>
          주방후드 · 아일랜드후드 · 침니후드
          <br />
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

        <p>
          전국 주방후드 교체·설치 전문
        </p>

        <p>
          홈페이지: hoodmaster.kr
        </p>

        <small>
          © {new Date().getFullYear()} 후드의정석.
          All rights reserved.
        </small>
      </footer>
    </main>
  );
}
