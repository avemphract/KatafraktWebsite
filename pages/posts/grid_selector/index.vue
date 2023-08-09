<template>
    <div id="grid_selector">
        <PostTitle imgsrc="/posts-symbols/grid-drawing.svg">
            Grid yapısında doğru ve çember oluşturma
        </PostTitle>
        <p>
            Herkese merhaba bu yazımızda Grid yapısında farklı stratejilerle doğru oluşturma, çember ve daire oluşturma konularından bahsedeceğim. Herkese iki
            okumalar.
        </p>
        <p>
            Kordinat sisteminde doğruların veya şekillerin hangi noktanın çevresinden geçtiğini anlamamız gerekebilir. Örneğin bir noktanın 5 yarıçapındaki
            daire içerisindeki nodları listeleyerek o nodlarda herhangi bir olay(patlama gibi) gerçekleştirebiliriz. Yada bir noddan diğer noda doğru çizerek
            nodların bir birini görüp görmediğini test edebiliriz. İlk olarak doğru oluşturma stratejilerine bakalım.
        </p>
        <section>
            <ParagraphTitle>Lineer interpolasyonla doğru oluşturma</ParagraphTitle>
            <p>
                Lineer interpolasyonla oluşturma, doğru içerisindeki noktalardan uygun pozisyonları seçerek noktalardan nod listesi oluşturmaktır. Bu
                oluşturulan nodlar birbirine çapraz bağlanabilir.
            </p>
            <p>Öncelikle doğru parçasının x'ler farkını ve y'ler farkını buluruz. Bunlardan mutlak değeri büyük olanı alırız;</p>
            <MathJax>$$P_{begin}(x_b,y_b),\qquad P_{end}(x_e,y_e)$$ $$dx=x_e-x_b,\qquad dy=y_e-y_b$$ $$n_{max}=max(abs(dx),abs(dy))$$</MathJax>
            <p>
                Bu değer doğrunun kaç noda temas ettiğini verir. Doğruyu eş n_max parçaya böleriz ve bölüm noktalarından hangi noda daha yakın olduğunu buluruz.
                Bu nodları listeye ekleyerek sonuca ulaşırız.
            </p>
            <MathJax>$$ P_i=\left( x_b+\frac{dx}{n_{max}}*i \ , \ y_b+\frac{dy}{n_{max}}*i \right) $$</MathJax>
            <p>Son olarak i'yerine 0 dan birer birer n_max'a kadar ve x_i, y_i değerleri yuvarlanır böylece nodları buluruz.</p>
            <svg
                :id="svg_1_container.toString()"
                class="grid-svg mx-5 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 21 8"></svg>
            <p>Buraya kadar yaptığımızı şimdi koda dökelim</p>

            <CodeBlock code-map-path="/codesamples/posts/grid_selector/code1" />
        </section>
        <section>
            <ParagraphTitle>Dikey ve Yatay hareketle doğru oluşturma</ParagraphTitle>
            <p>
                Farkettiğiniz üzere interpolasyonla bulduğumuz nodlarda çapraz hareket olmaktadır. Ama yürürken hareketiniz bu şekilde gerçekleşmez. Bunun için
                doğrunun temas ettiği tüm nodları bulmamız gerekir. Bunun için her nodu dikeyde ve yatayda iki farklı sınırı varmış gibi düşünmeliyiz. Hangi
                sınırla önce kesişiyorsa o yöne doğru bir adım ilerleriz taki bitiş nodumuza ulaşana kadar.
            </p>
            <p>Interpolasyonla olan farkını iki görsel daha iyi ifade edecektir.</p>
            <svg
                :id="svg_2_container.toString()"
                class="grid-svg mx-5 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 21 8"></svg>
            <p>Bu yöntemi koda dökmek istersek:</p>
            <CodeBlock code-map-path="/codesamples/posts/grid_selector/code2" />
        </section>
        <section>
            <ParagraphTitle>Çember oluşturma</ParagraphTitle>
            <p>
                Çember oluşturmak için kullandığımız işlem aslında daha az hatalı nodu seçmektir. Öncelikle en üst noddan çizmeye başlarız. Daha sonra iki
                farklı nod için iki hatayı hesaplarız. x değerini bir artırarak ilk hatamızı buluruz. İkinci hatayı ise hem x bir arttırıp hemde y değerini bir
                azaltarak elde ederiz. Hangisinde hata daha azsa o noda geçeriz. Bunu x ve y eşit olana kadar yaparız. Buraya kadar elde ettiğimiz şey bir
                çemberin sekizde biridir. Bunu 7 kez döndündürerek, yansıtarak tam bir çember elde etmiş oluruz. Bu yaptığımız işlemler sırasında aynı nodu iki
                kez seçmiş olabiliriz. Bu yüzden Set kullanmamız gerekir. Yada bir kaç değişikle dublikasyonu engelleyebilirsiniz. Şimdi bu anlatılanları koda
                dökelim.
            </p>
            <CodeBlock code-map-path="/codesamples/posts/grid_selector/code3" />
            <svg
                :id="svg_3_container.toString()"
                class="grid-svg mx-5 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 21 21"></svg>
            <div class="slidecontainer">
                <span class="min-w-200px max-w-200px inline-block text-left">Çemberin yarıçapı = {{ svg_3_value }}</span>
                <input
                    v-model="svg_3_value"
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.1" 
                    class="slider" 
                    @input="svg_3_container.changeRadius(svg_3_value)">
            </div>
        </section>
        <section>
            <ParagraphTitle>Daire oluşturma</ParagraphTitle>
            <p>
                Çember oluşturmak için kullandığımız algoritmayı ufak değişiklerle daire oluşturmaya dönüştürebiliriz. Her nodu elde ettiğimiz adımda, elde
                ettiğimiz P(x,y) nodu ile P(x,x) nodu arasındaki tüm nodları alırız. Geri kalan işlemler birebir çember oluşturmakla aynıdır.
            </p>
            <CodeBlock code-map-path="/codesamples/posts/grid_selector/code4" />
            <p>Aşağıdaki görselsel oluşturduğumuz dairenin nasıl gözükeceğini göstermektedir. Gördüğünüz gibi yarıçap tam sayı olmak zorunda değildir.</p>
            <p>Döngü içine eklediğimiz bir döngü bize merkezden itibaren çemberin içinde kalan nodları verecektir. Kodumuzun çıktısı aşağıdaki gibidir.</p>
            <svg
                :id="svg_4_container.toString()"
                class="grid-svg mx-5 w-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 21 21"></svg>
            <div class="slidecontainer">
                <span class="min-w-200px max-w-200px inline-block text-left">Çemberin yarıçapı = {{ svg_4_value }}</span>
                <input
                    v-model="svg_4_value"
                    type="range" 
                    min="1" 
                    max="10" 
                    step="0.1" 
                    class="slider" 
                    @input="svg_4_container.changeRadius(svg_4_value)">
            </div>
            <p>
                Eğer yarıçapı sadece tam sayı kullanacaksanız yukarıdaki algoritmayı bir kere çalıştırıp değerleri kaydedip daha sonra kaydedilen değerleri
                kullanmak işlemci yükünü azaltacaktır.
            </p>
        </section>
        <section>
            <ParagraphTitle>Özet ve Eklenebilecekler</ParagraphTitle>
            <p>
                Bu yazımda grid yapısında doğru ve daire nasıl çizilir onu anlattım. Doğruyu iki farklı strateji ile çizebiliriz. Interpolasyonla çizmek doğruyu
                eş parçalara bölüp o parçaların hangi nodları içinde kaldığı ile bulunur. Diğer doğru çizme algoritması ile nodların sınırları ile kesişimlerini
                bulur ve bitiş noduna kadar sırasıyla uygularız.
            </p>
            <p>
                Çemberler ve Daire çizim algoritması birbirine çok benzemektedir. 0'dan 45 dereceye kadar nerede az hata geliyorsa nerede sola veya hem sola
                hemde sağa kaydırırız. 45 dereceye kadar olmasının sebebi dairenin 45'den sonra eğiminin 1 den büyük olması ve bir sola giderken bir den daha
                fazla aşağıya gidebilmesidir. Yazdığım algoritma daha anlaşılır olsun diye dublikasyonları engellemedim. Bir kaç ufak değişiklikle bunları
                engelleyebilirsiniz. Ayrıca bu algoritmanın bir benzerini kullanarak elipste çizebilirsiniz.
            </p>
            <p>
                Bu yazımda anlatacaklarım bu kadar, yazımda hatalı veya eksik bir yer görürseniz benimle iletişime geçmekten çekinmeyin. Herkese iyi kodlamalar.
            </p>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import PostTitle from "@/components/PostTitle.vue";
import ParagraphTitle from "@/components/ParagraphTitle.vue";
import MathJax from "@/components/MathJax.vue";

import GridInterpolation from "@/utils/posts/grid_selector/GridInterpolation";
import GridCircle from "@/utils/posts/grid_selector/GridCircle";
import GridRing from "@/utils/posts/grid_selector/GridRing";
import GridWalk from "@/utils/posts/grid_selector/GridWalk";


definePageMeta(
    {
        layout: "post-layout",
        type: "Post",
        titleImage: "/posts-symbols/grid-drawing.svg",
        introduction: `Herkese merhaba bu yazımızda Grid yapısında farklı stratejilerle doğru oluşturma, çember ve daire oluşturma konularından bahsedeceğim. Herkese iki
            okumalar.`.replaceAll("\n"," "),
        name:"Grid yapısında doğru ve çember oluşturma",
        order: 4
    }
);
export default defineComponent({
    components: { CodeBlock, PostTitle, ParagraphTitle, MathJax },
    data() {
        return {
            svg_1_container: new GridInterpolation("svg_1"),
            svg_2_container: new GridWalk("svg_2"),
            svg_3_container: new GridRing("svg_3"),
            svg_3_value: 2,
            svg_4_container: new GridCircle("svg_4"),
            svg_4_value: 2
        };
    },
    mounted() {
        this.svg_1_container.mounted();
        this.svg_2_container.mounted();
        this.svg_3_container.mounted();
        this.svg_4_container.mounted();
    }
});
</script>

<style lang="scss" scoped>

</style>
