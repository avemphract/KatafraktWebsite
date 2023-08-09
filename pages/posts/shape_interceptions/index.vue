<template>
    <div id="shape_interceptions">
        <PostTitle imgsrc="/advanced-grids.svg">
            Şekillerin kesişimleri
        </PostTitle>
        <section>
            <p>
                Merhaba bu yazımda şekillerin bir biri ile kesişip kesişmediğini nasıl anlayacağımızı göstereceğim. Bu yazıda iki tip şekilden bahsedeceğim. Bu şekiller daire ve poligon. Poligonların ne olduğu, nasıl gösterileceği onlara uygulanan dönüşümler için Poligonlar ve Dönüşüm Matrisleri Uygulaması başlıklı yazımı okuyabilirsiniz. Bazı kodları bu yazım üzerine kuracağım.
            </p>
            
            <div class="grid grid-cols-2">
                <svg
                    :id="svg_1_container_id"
                    class="svg-container mx-5 w-auto h-300px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000">
                </svg>
            </div>
        </section>
        <section>
            <ParagraphTitle>
                Dairelerin Matris Üzerinde Gösterimi
            </ParagraphTitle>
            <ReferencePage page-name="Poligonlar ve Dönüşüm Matrisleri Uygulaması" />
            <p>
                Önceki yazımda poligonları nasıl maktris üzerinde gösterildiğini anlatmıştım. O yazıda uygulanan dönüşümleri daireler için de uygulayaacğım Bu yüzden öncelikle Daireleri nasıl matris üzerinde göstereceğimize bakalım. 
                Matris oluştururken aslında hangi noktaları nasıl seçeceğimiz konusunda özgürüz. Poligonlarda köşe noktalarını matrikse taşımamız açık ara en mantıklı seçimdi. Ama daireyi gösterirken bir takım seçim yapmamız gerekecek. Benim seçtiğim noktalar çemberin merkez noktası ve çember çeperinde bir nokta. Çember çeperinde iki nokta seçseydik çember elipse dönebilirdi. 
                Yarıçapda bu iki nokta arasındaki uzaklık olmuş olur.
            </p>
            <div class="grid grid-cols-2">
                <svg
                    :id="svg_2_container_id"
                    class="svg-container mx-5 w-auto h-[%50] inline"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000">
                </svg>
                <div class="grid grid-rows-4 place-self-center text-2xl w-full">
                    <MathJax>
                        $$\begin{bmatrix}x_1 & x_2\\\ y_1 & y_2\end{bmatrix} = \begin{bmatrix}{{ svg_2_circle_coor[0][0].toFixed(1) }} & {{ svg_2_circle_coor[1][0].toFixed(1) }} \\\ {{ svg_2_circle_coor[0][1].toFixed(1) }} & {{ svg_2_circle_coor[1][1].toFixed(1) }} \end{bmatrix}$$
                    </MathJax>
                    <MathJax class="text-center">
                        $$(x_2 - x_1)^2 + (y_2 - y_1)^2 = r^2$$
                    </MathJax>
                    <MathJax>
                        $$(({{ svg_2_circle_coor[1][0].toFixed(1) }}) - ({{ svg_2_circle_coor[0][0].toFixed(1) }}))^2 + (({{ svg_2_circle_coor[1][1].toFixed(1) }}) - ({{ svg_2_circle_coor[0][1].toFixed(1) }}))^2  = {{ ((svg_2_circle_coor[0][0]-svg_2_circle_coor[1][0])**2 + (svg_2_circle_coor[0][1]-svg_2_circle_coor[1][1])**2).toFixed(1) }}$$
                    </MathJax>
                    <MathJax class="block text-center">
                        $$ r = {{ (((svg_2_circle_coor[0][0]-svg_2_circle_coor[1][0])**2 + (svg_2_circle_coor[0][1]-svg_2_circle_coor[1][1])**2)**(0.5)).toFixed(1) }}$$
                    </MathJax>
                </div>
            </div>
            <p>Bu yukarıda yaptığımız işlem bu şekil özelinde dönüşüm matrislerini uygulamamıza olanak sağlayacaktır.</p>
        </section>
        <section>
            <ParagraphTitle>
                Daire Daire Kesişimi
            </ParagraphTitle>
            <p>
                Daire-Daire kesişiminde öncelikli ilk olarak anlatmam gereken konu daireler kesişiyor mu? Bunun hesabı çok basit matematikle yapılabilir. Dairelerin merkezleri arasındaki uzaklık yarıçapları toplamı uzaklığından daha küçükse daireler kesişiyordur.
                Tabi ki gerçek zamanlı hesaplama yapmamız gerektiğinden ufak bir optimizasyon yapmamız gerekir.
            </p>
            <div class="grid grid-cols-2">
                <svg
                    :id="svg_3_container_id"
                    class="svg-container mx-5 w-auto h-300px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-500 -500 1000 1000">
                </svg>
                <div>
                    <MathJax>$$(x_2 - x_1)^2 + (y_2 - y_1)^2 &gt; (r_1 + r_2)^2$$</MathJax>
                    <p>
                        ise dairelerimiz kesişiyordur.
                    </p>                    
                    <MathJax>
                        $$({{ svg_3_com2_x.toFixed(0) }} - {{ svg_3_com1_x.toFixed(0) }})^2 + ({{ svg_3_com2_y.toFixed(0) }} - {{ svg_3_com1_y.toFixed(0) }})^2 {{ svg_3_eq }} (r_1 + r_2)^2 = (200 + 150)^2 $$
                    </MathJax>

                    <p>
                        Unutmayın kök alma işlemi çok masraflı bir işlemdir. Gerekmedikçe kullanmamamız gerekiyor.
                    </p>
                </div>
            </div>
            <p>
                Dairelerin kesiştiğini bulduk peki hangi noktalarda kesiştiğini nasıl bulacağız? Bunun için kesişen daire örneğine bakalım.
            </p>
            <svg
                :id="svg_4_container_id"
                class=" svg-container m-5 w-auto h-300px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-500 -500 1000 1000">

            </svg>
        </section>
    </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

import PostTitle from "@/components/PostTitle.vue";
import MathJax from "@/components/MathJax.vue";
import ReferencePage from "@/components/ReferencePage.vue";

import Composition from "@/utils/posts/polygons/Composition";
import Polygon from "@/utils/posts/polygons/Polygon";
import StaticContainer from "@/utils/posts/polygons/StaticContainer";
import Point from "@/utils/posts/polygons/Point";
import Circle from "@/utils/posts/shape_intercepitons/Circle";
import ChangeableShapeContainer from "@/utils/posts/polygons/ChangeableShapeContainer";
import InterceptionCircleShapeContainer from "@/utils/posts/shape_intercepitons/InterceptionCircleShapeContainer";
import { matrixCalculation } from "@/utils/posts/polygons/MatrixProcesses";
import { RefMaybe, fakeRef } from "@/utils/types/RefObject";
import DetailedInterceptionCircleShapeContainer from "@/utils/posts/shape_intercepitons/DetailedInterceptionCircleShapeContainer";

const svg1Points = [
    new Point(fakeRef(200), fakeRef(-250)), 
    new Point(fakeRef(300), fakeRef(0)), 
    new Point(fakeRef(-100), fakeRef(200)), 
    new Point(fakeRef(-300), fakeRef(-100)), 
    new Point(fakeRef(0), fakeRef(-300))
];
const svg_1_comp = new Composition([new Polygon(svg1Points)]);
const svg_1_container = new StaticContainer("svg-1", false);
svg_1_container.composition.push(svg_1_comp);

const svg_2_circle = new Circle(new Point(ref(0),ref(0)),200);
const svg_2_comp = new Composition([svg_2_circle]);
const svg_2_container = new ChangeableShapeContainer("svg-2", svg_2_comp, true);

const svg_3_com1_x:RefMaybe<number> = ref(150); 
const svg_3_com1_y:RefMaybe<number> = ref(-100);

const svg_3_com2_x:RefMaybe<number> = ref(-150); 
const svg_3_com2_y:RefMaybe<number> = ref(100);
const svg_3_com1 = new Composition([new Circle(new Point(fakeRef(0),fakeRef(0)),200)], svg_3_com1_x, svg_3_com1_y);
const svg_3_com2 = new Composition([new Circle(new Point(fakeRef(0),fakeRef(0)),150)], svg_3_com2_x, svg_3_com2_y);
const svg_3_container = new InterceptionCircleShapeContainer("svg-3", svg_3_com1, svg_3_com2);

const svg_4_com1 = new Composition([new Circle(new Point(fakeRef(0),fakeRef(0)),200)], fakeRef(0), fakeRef(0));
const svg_4_com2 = new Composition([new Circle(new Point(fakeRef(0),fakeRef(0)),150)], fakeRef(0), fakeRef(0));
const svg_4_container = new DetailedInterceptionCircleShapeContainer("svg-4", svg_4_com1, svg_4_com2);

definePageMeta(
    {
        layout: "post-layout",
        type: "Post",
        titleImage: "/posts-symbols/advanced-grids.svg",
        introduction: `Merhaba bu yazımda şekillerin bir biri ile kesişip kesişmediğini nasıl anlayacağımızı göstereceğim. 
        Bu yazıda iki tip şekilden bahsedeceğim. Bu şekiller daire ve poligon. Poligonların ne olduğu, nasıl gösterileceği 
        onlara uygulanan dönüşümler için Poligonlar ve Dönüşüm Matrisleri Uygulaması başlıklı yazımı okuyabilirsiniz. Bazı 
        kodları bu yazım üzerine kuracağım.`.replaceAll("\n",""),
        name: "Şekillerin Kesişimleri",
        order: 5
    }
);
export default defineComponent({
    components:{PostTitle, MathJax, ReferencePage},
    data(){
        return{
            svg_1_container_id:svg_1_container.id,
            svg_2_container_id:svg_2_container.id,
            svg_3_container_id:svg_3_container.id,

            svg_3_com1_x:svg_3_com1_x,
            svg_3_com1_y:svg_3_com1_y,
            svg_3_com2_x:svg_3_com2_x,
            svg_3_com2_y:svg_3_com2_y,
            
            svg_4_container_id:svg_4_container.id,
        }
    },
    computed:{
        svg_2_circle_coor() { return svg_2_circle.getMatrix() },
        svg_3_circle1_coor() { return matrixCalculation(svg_3_com1.operations, svg_3_com1.shapes[0].getMatrix()); },
        svg_3_circle2_coor() { 
            console.log("x: " + matrixCalculation(svg_3_com2.operations, svg_3_com2.shapes[0].getMatrix())[0][0]);
            console.log("y: " + matrixCalculation(svg_3_com2.operations, svg_3_com2.shapes[0].getMatrix())[0][1]);
            return matrixCalculation(svg_3_com2.operations, svg_3_com2.shapes[0].getMatrix());
        },
        svg_3_eq():"="|"<"|">"{
            const res = ((this.svg_3_com2_x - this.svg_3_com1_x)**2 + (this.svg_3_com2_y - this.svg_3_com1_y)**2) - (200 + 150)**2
            if(res == 0)
                return "="
            else if(res>0)
                return ">";
            else
                return "<";
        }
    },
    mounted() {
        svg_1_container.mounted();
        svg_2_container.mounted();
        svg_3_container.mounted();
        svg_4_container.mounted();
    }
});
</script>utils/posts/shape_intercepitons/InterceptionCircleShapeContainer