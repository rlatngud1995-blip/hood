# 후드의정석 SEO 배포 및 검증

- 중복된 `/services/[service]` 라우트 제거. `/services/[slug]`만 사용.
- `/area/[region]/[district]/[service]`는 기존 영구 리디렉션에 맞춰 페이지 생성 제거. 기존 링크는 지역 대표페이지로 308 이동.
- 사이트맵에는 실제 200 응답을 제공하는 대표 URL만 포함.
- 루트 레이아웃의 공통 canonical 제거: 각 하위 페이지가 자신의 canonical을 지정하도록 유지.
- favicon: `public/C0500998-EA19-4072-BE43-D77819DAA210.png`.

## 배포 후 반드시 확인
1. Vercel Production 배포가 성공했는지 확인.
2. `/`, `/services/kitchen-hood`, `/area/seoul`, `/area/seoul/gangnam`가 200인지 확인.
3. `/area/seoul/gangnam/kitchen-hood`가 `/area/seoul/gangnam`로 308 리디렉션되는지 확인.
4. 각 페이지의 `canonical`이 해당 URL을 가리키는지 확인.
5. `/robots.txt`, `/sitemap.xml` 확인 후 네이버 서치어드바이저·구글 서치콘솔에 제출.
6. 실제 시공 사진, 지역별 작업 사례, 시공 가능 지역·사업자 정보 등을 사실에 맞게 보강. 얇거나 반복적인 지역페이지는 색인되지 않을 수 있음.
7. 검색엔진의 색인·순위는 보장되지 않음.
