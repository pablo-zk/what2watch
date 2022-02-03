<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\ContentList;
class ListController extends AbstractController
{
    /**
     * @Route("/list", name="list")
     */
    public function index(): Response
    {
        $lists =  $this->getDoctrine()->getRepository(ContentList::class)->findAll();

        $data = [];

        foreach ($lists as $list){
            $tmp =[
                "id" => $list->getId(),
                "title" =>  $list->getTitle(),
                "icon" => $list->getIcon(),
                "films" => $list->getFilms()
            ];
            $data[] = $tmp;
        }
        return $this->json([
            $data,
        ]);
    }

    /**
     * @Route("/list/{id}", name="product-id", methods="get", requirements={"id": "\d+"})
     */
    public function findById($id){

        $list = $this->getDoctrine()->getRepository(ContentList::class)->find($id);

        $data = [
            "id" => $list->getId(),
                "title" =>  $list->getTitle(),
                "icon" => $list->getIcon(),
                "films" => $list->getFilms()
        ];

        return $this->json([
            $data
        ]);
    }


    public function insertList(Request $request){
        
    }
}
