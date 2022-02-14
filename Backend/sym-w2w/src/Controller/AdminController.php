<?php

namespace App\Controller;

use App\Entity\ContentList;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin/lists", name="admin", methods="get")
     */
    public function showAllLists(): Response
    {
        $users = $this->getDoctrine()->getRepository(User::class)->findAll();

        $data = [];

        foreach ($users as $user){
            $tmp_list=[];
            foreach ($user->getLists() as $list){
                array_push($tmp_list , [
                    "id" => $list->getId(),
                    "title" =>  $list->getTitle(),
                    "icon" => $list->getIcon(),
                ]);
            }
            $tmp = [
                "username" => $user->getUsername(),
                "lists" => $tmp_list,
            ];
            $data[] = $tmp;
        }




//        $lists = $this->getDoctrine()->getRepository(ContentList::class)->findAll();
//        $data = [];
//
//        foreach ($lists as $list){
//            $tmp =[
//                "id" => $list->getId(),
//                "title" =>  $list->getTitle(),
//                "icon" => $list->getIcon(),
//                "user" => $list->getUser()->getUsername()
//            ];
//            $data[] = $tmp;
//        }
        return $this->json([
            $data,
        ]);
    }
}
