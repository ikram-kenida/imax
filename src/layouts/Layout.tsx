import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Helmet>
        <title>Imax Store</title>
        <meta
          name="description"
          content="نحن روّاد في عالم الألعاب الإلكترونية ورياضة الكترونية، نقدم لكم أكبر متجر عربي يضم مجموعة متنوعة من المنتجات المميزة التي تلبي احتياجات عشاق الألعاب والمحترفين على حد سواء. متجرنا مصمم ليوفر لكم تجربة تسوق استثنائية، حيث يتم تنفيذ طلباتكم بشكل تلقائي وفوري دون عناء، بأفضل الأسعار وأعلى جودة. يفخر متجرنا بأكثر من 500 تقييم إيجابي يشهد لجودة خدماتنا والتزامنا برضا عملائنا. اكتشف معنا عالم الألعاب بأبعاده المثيرة وانطلق في مغامرة لا مثيل لها مع متجرنا."
          lang="ar"
        />
        <meta
          name="keywords"
          content="نحن روّاد في عالم الألعاب الإلكترونية ورياضة
    الكترونية، نقدم لكم أكبر متجر عربي يضم مجموعة متنوعة من المنتجات المميزة
    التي تلبي احتياجات عشاق الألعاب والمحترفين على حد سواء. متجرنا مصمم ليوفر
    لكم تجربة تسوق استثنائية، حيث يتم تنفيذ طلباتكم بشكل تلقائي وفوري دون عناء،
    بأفضل الأسعار وأعلى جودة. يفخر متجرنا بأكثر من 500 تقييم إيجابي يشهد لجودة
    خدماتنا والتزامنا برضا عملائنا. اكتشف معنا عالم الألعاب بأبعاده المثيرة
    وانطلق في مغامرة لا مثيل لها مع متجرنا."
          lang="ar"
        />
        <meta
          name="description"
          content="As pioneers in electronic games and e-sports, we present the largest Arab store offering a variety of unique products. Experience effortless, instant, and high-quality shopping with over 500 positive reviews."
          lang="en"
        />
        <meta
          name="keywords"
          content="As pioneers in electronic games and e-sports, we present the largest Arab store offering a variety of unique products. Experience effortless, instant, and high-quality shopping with over 500 positive reviews."
          lang="en"
        />
        <meta
          name="description"
          content="Leaders dans l'industrie des jeux électroniques, nous offrons un magasin arabe vaste, avec une gamme de produits pour amateurs et professionnels. Bénéficiez d'une expérience d'achat unique avec des commandes traitées immédiatement, offrant les meilleurs tarifs et une qualité exceptionnelle."
          lang="fr"
        />
        <meta
          name="keywords"
          content="Leaders dans l'industrie des jeux électroniques, nous offrons un magasin arabe vaste, avec une gamme de produits pour amateurs et professionnels. Bénéficiez d'une expérience d'achat unique avec des commandes traitées immédiatement, offrant les meilleurs tarifs et une qualité exceptionnelle."
          lang="fr"
        />
      </Helmet>
      <header>
        <NavBar />
      </header>
      <main className="w-full h-full">
        <Outlet />
        {children}
      </main>
      <footer className="bg-slate-900 py-14">
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
